import { Router } from "express";
import passport from "passport";

const router = Router()

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    session: true,
    failureFlash: true,
    successFlash: "Logged out.",
  }),
  (_, res) => {
    res.redirect('/')
  }
)

router.post('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('/login/facebook', passport.authenticate('facebook', { scope: 'email' }))

router.get(
  '/login/facebook/return',
  passport.authenticate('facebook', {
    failureRedirect: '/login',
    scope: 'email'
  }),
  (_, res) => {
    res.redirect('/')
  }
)

router.post('/facebook/ddc', (req, res) => {
  console.log(req.query)
  console.log(req.body)

  if (!req.body || !req.body.signed_request) {
    console.log('Bad Request!')
    return res.sendStatus(400)
  }

  return
})

export default router
