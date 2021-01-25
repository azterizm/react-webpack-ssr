import express from 'express'
import robots from 'express-robots-txt'
import session from 'express-session'
import passport from 'passport'
import { Strategy } from 'passport-local'
import path from 'path'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import { Helmet } from 'react-helmet'
import { StaticRouter } from 'react-router-dom'
import App from './components/App'
import { Html } from './components/Html'
import  siteMapMiddleware  from './middlewares/sitemapMiddleware'
import authRouter from './routes/localAuth'
import flash from 'connect-flash'
//TODO: Change state user type
import { users, User } from './utils/mocks'

passport.use(new Strategy((username, password, done) => {
  try {
    const user: User | undefined = users.find(user => user.username === username)
    if (!user) return done(null, false, { message: 'Incorrect username.' })
    if (user.password !== password) return done(null, false, { message: 'Incorrect password.' })
    return done(null, user)
  } catch (error) {
    return done(error)
  }
}))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  const user = users.find(user => user.id === id)
  return done(null, user)
})

const app = express()
const PORT = process.env.PORT ?? 5000

app.use(express.static(path.join(__dirname)))
app.use(robots({
  UserAgent: '*',
  Disallow: '/profile',
  Sitemap: 'https://react-webpack-ssr.herokuapp.com/sitemap.xml/'
}))
app.use('/sitemap.xml', siteMapMiddleware)
app.use(express.urlencoded({ extended: true }))
app.use(flash())
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())

app.use('/account', authRouter)
app.get('*', (req, res) => {
  const state: AppState = { name: 'Bro!', user: req.user, flash: req.flash() }

  let appMarkup: string = renderToString(
    <StaticRouter location={req.url}>
      <App state={state} />
    </StaticRouter>
  )

  const helmet = Helmet.renderStatic()

  const html: string = renderToStaticMarkup(
    <Html children={appMarkup} scripts={['main.js']} state={state} helmet={helmet} />
  )

  res.send(`<!DOCTYPE html> ${html}`)
})

app.listen(PORT, () => console.log('server runnin at', PORT))
