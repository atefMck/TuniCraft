const express = require('express')
const bcrypt = require('bcryptjs');
const User = require('../models/User').User;
const UserVerify = require('../models/User').UserVerify;
const Rank = require("../models/User/Ranks").Rank;
const mailer = require('../../utils/Mailer')

const generateAccessToken = require('../../utils/Token').generateAccessToken

const jwt = require("jsonwebtoken");
require('dotenv').config();
const {
  ACCESS_TOKEN_SECRET = "defaultsecret",
} = process.env

const router = express.Router()

const signUp = (req, res) => {
  // Validate request
  if (!req.body.username) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const user = {
    userName: req.body.username,
    email: req.body.email.toLowerCase(),
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    dateOfBirth: req.body.dateOfBirth,
  };
  
  User.create(user)
    .then( data => {
      Rank.findOne({where: {name: "Administrator"}})
      .then(async (rank) => {
        data.addRank(rank, {"through": "user_ranks"})
        const token = generateAccessToken(user.id)
        await mailer.sendMail({
          from: 'no-reply@tunicraft.tn,',
          to: data.email,
          subject: "[Tunicraft] Account verification",
          html: `<a href="http://localhost:3000/verify-account/${data.id}/${token}">Verification Link</a>`,
        });
        const userverify = {
          userId: data.id,
          token
        }
        UserVerify.create(userverify).then(() => {
          res.status(200).send({user: data, message: "Verification token sent"})
        })
      })
    })
    .catch(err => {
      if (err.errors[0].type === 'unique violation') {
        let attr = err.errors[0].path.split(".")[1].toLowerCase();
        attr = attr.charAt(0).toUpperCase() + attr.slice(1);
        const message = `${attr} already taken`
        res.status(400).send({ message: message});
      } else if (err.errors[0].message) {
        res.status(400).send({ message: err.errors[0].message});
      } else {
        res.status(500).send({ message: "Internal server error has occured."});
      }
    });
};

const signIn = (req, res) => {
  if (!req.body.username) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({where: {userName: username}})
  .then(user => {
      if (bcrypt.compareSync(password, user.password)) {
          const token = generateAccessToken(user.id)
          const headers = {
              "authorization": `Bearer ${token}`,
              'Access-Control-Expose-Headers': "authorization"
          }
          res.set(headers)
          res.status(200).send({
              token: token,
              message: "Login successful",
          })
      }
      else {
          res.status(400).send({
              message: "Incorrect credentials.",
          })
      }
  })
  .catch(err => {
      res.status(400).send({
          message: "Incorrect credentials.",
      });
  });
}

// Authnetification Routes
router.post('/login', signIn)
router.post('/register', signUp)

module.exports = router;

