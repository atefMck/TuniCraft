const express = require('express')
const router = express.Router()
const User = require('../controllers/User.js');
const authenticateToken = require('../../utils/Token').authenticateToken

router.get('/', authenticateToken, User.findOne)

module.exports = router;