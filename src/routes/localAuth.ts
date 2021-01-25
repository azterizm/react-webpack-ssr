import { Router } from "express";
import passport from "passport";

const router = Router()

console.log('router middleware')
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
  })

router.post('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

export default router
