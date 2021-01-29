import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import { User, users } from '../utils/mocks'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'

export default () => {
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
    clientID: process.env.FB_CLIENT_ID ?? '',
    clientSecret: process.env.FB_CLIENT_SECRET ?? '',
    callbackURL: process.env.FB_CALLBACK_URL ?? '',
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

  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID ?? '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    callbackURL: process.env.GOOGLE_CALLBACK_URL ?? ''
  }, (accessToken, refreshToken, profile, done) => {
    done(null, profile)
    // const googleUser: User = {
    //   id: profile.id,
    //   username: '',
    //   email: '',
    //   token: accessToken,
    //   refreshToken: refreshToken
    // }

    // const user = users.find(user => user.id === googleUser.id)

    // try {
    //   if (user) return done(null, user)
    //   if (!user) {
    //     users.push(googleUser)
    //     return done(null, googleUser)
    //   }
    // } catch (err) {
    //   done(err)
    // }
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((obj, done) => {
    done(null, obj as any)
  })
}
