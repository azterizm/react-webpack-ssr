import flash from 'connect-flash'
import connectRedisStore from 'connect-redis'
import dotenv from 'dotenv'
import express from 'express'
import robots from 'express-robots-txt'
import session from 'express-session'
import passport from 'passport'
import path from 'path'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import { Helmet } from 'react-helmet'
import { StaticRouter } from 'react-router-dom'
import { createClient } from 'redis'
import authRouter from './backend/localAuth'
import passportConfig from './backend/pass'
import siteMapMiddleware from './backend/sitemapMiddleware'
import App from './components/App'
import { Html } from './components/Html'

dotenv.config()
passportConfig()

const app = express()
const PORT = process.env.PORT ?? 5000
const redisClient = createClient({
  host: process.env.REDIS_HOST ?? '',
  port: Number(process.env.REDIS_PORT) ?? '',
  password: process.env.REDIS_PASSWORD ?? ''
})
const redisStore = connectRedisStore(session)

app.use(express.static(path.join(__dirname)))
app.use(robots({
  UserAgent: '*',
  Disallow: '/profile',
  Sitemap: 'https://react-webpack-ssr.herokuapp.com/sitemap.xml/'
}))
app.use('/sitemap.xml', siteMapMiddleware)
app.use(express.urlencoded({ extended: true }))
app.use(flash())
app.use(session({
  secret: 'keyboard cat',
  store: new redisStore({ client: redisClient, ttl: 60 * 2 }),
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 }
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/account', authRouter)
app.get('*', (req, res) => {
  const state: AppState = { name: 'Bro!', user: req.user, flash: req.flash() }
  const scripts: string[] = ['main.js', 'react.js', 'runtime.js', 'vendor.js']

  let appMarkup: string = renderToString(
    <StaticRouter location={req.url}>
      <App state={state} />
    </StaticRouter>
  )

  const helmet = Helmet.renderStatic()

  const html: string = renderToStaticMarkup(
    <Html children={appMarkup} scripts={scripts} state={state} helmet={helmet} />
  )

  res.send(`<!DOCTYPE html> ${html}`)
})

app.listen(PORT, () => console.log('server runnin at', PORT))
