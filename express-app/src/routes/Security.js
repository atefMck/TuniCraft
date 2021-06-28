const express = require('express')
const User = require("../models/User").User;
const UserVerify = require("../models/User").UserVerify;
const generateAccessToken = require('../../utils/Token').generateAccessToken
const mailer = require('../../utils/Mailer')

const router = express.Router()

router.get('/verify-account/:userId/:token', (req, res) => {
  const userId = req.params.userId
  const token = req.params.token
  if (userId === null || token === null) res.status(400).send({message: "Bad request"})
  else {
    UserVerify.findOne({where: {userId: userId, token: token}})
      .then((data) => {
        User.findOne({where: {id: data.userId}})
          .then(async (user) => {
            user.verified = true
            await user.save()
            data.destroy()
            res.status(200).send({verified: true, message: "Account verified successfully"})
          })
      })
      .catch(() => {
        res.status(400).send({verified: false, message: "Verification link expired"})
      })
  }
})

router.post('/reset-password/', (req, res) => {
  const { email } = req.body
  User.findOne({where: {email: email}})
    .then(async (user) => {
      const token = generateAccessToken(user.id)
      await mailer.sendMail({
        from: 'no-reply@tunicraft.tn,',
        to: email,
        subject: "[Tunicraft] Password reset",
        html: `<a href="http://localhost:3000/reset-password/${user.id}/${token}">Reset Password</a>`,
      });
      const userverify = {
        userId: user.id,
        token
      }
      UserVerify.create(userverify).then(() => {
        res.status(200).send({user: user, message: "Password reset token sent"})
      })
    })
    .catch(() => {
      res.status(400).send({message: "Bad request"})
    })
})

module.exports = router;