import flash from 'connect-flash'
import connectRedisStore from 'connect-redis'
import express from 'express'
import robots from 'express-robots-txt'
import session from 'express-session'
import passport from 'passport'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import { Strategy as LocalStrategy } from 'passport-local'
import path from 'path'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import { Helmet } from 'react-helmet'
import { StaticRouter } from 'react-router-dom'
import { createClient } from 'redis'
import App from './components/App'
import { Html } from './components/Html'
import authRouter from './routes/localAuth'
import siteMapMiddleware from './routes/sitemapMiddleware'
import { User, users } from './utils/mocks'
import FSStore from 'connect-fs2'

/*
Facebook CREDENTIALS
APP_ID: 569740240649019
APP_SECRET: 246d37d2941f405c1b62e38d1f6911a0
*/

passport.use(new LocalStrategy((username, password, done) => {
  try {
    const user: User | undefined = users.find(user => user.username === username)
    if (!user) return done(null, false, { message: 'Incorrect username.' })
    if (user.password !== password) return done(null, false, { message: 'Incorrect password.' })
    return done(null, user)
  } catch (error) {
    return done(error)
  }
}))

passport.use(new FacebookStrategy({
  clientID: '569740240649019',
  clientSecret: '246d37d2941f405c1b62e38d1f6911a0',
  callbackURL: 'https://react-webpack-ssr.herokuapp.com/account/login/facebook/return',
  profileFields: ['id', 'displayName', 'photos', 'email']
}, (accessToken, refreshToken, profile, done) => {
  const FBUser: User = {
    id: profile.id,
    username: profile.displayName,
    email: (profile as any).emails[0].value,
    token: accessToken,
    refreshToken: refreshToken
  }

  const user = users.find(user => user.id === FBUser.id)

  try {
    if (user) return done(null, user)
    if (!user) {
      users.push(FBUser)
      return done(null, FBUser)
    }
  } catch (error) {
    done(error)
  }
}))

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((obj, done) => {
  done(null, obj as any)
})

const app = express()
const PORT = process.env.PORT ?? 5000
const FS = FSStore(session)

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
  store: new FS,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60 * 60 * 1000 }
}))
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
