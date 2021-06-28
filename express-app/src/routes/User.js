const express = require('express')
const router = express.Router()
const User = require('../models/User').User;
const Rank = require('../models/User/Ranks').Rank;
const authenticateToken = require('../../utils/Token').authenticateToken

router.get('/', authenticateToken, (req, res) => {
  User.findOne({where: {id: req.userId.id}, attributes: {exclude: ['password']}, include: {model: Rank}})
  .then(user => {
    res.status(200).send(user)
  })
  .catch(err => {
    res.status(500).send({error: "Internal server error"})
  })
})

router.post('/rank/', (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const rank = {
    name: req.body.name,
    permission: req.body.permission,
    badge: req.body.badge,
  }

  Rank.create(rank)
  .then(data => {
    res.status(200).send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err || "Internal server error has occured."
    });
  });
})

module.exports = router;