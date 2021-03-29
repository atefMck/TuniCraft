const express = require('express')
const bcrypt = require('bcryptjs');
const userModel = require('../models/User').User;
const userController = require('../controllers/User.js');
const generateAccessToken = require('../../utils/Token').generateAccessToken

const jwt = require("jsonwebtoken");
require('dotenv').config();
const {
    ACCESS_TOKEN_SECRET = "defaultsecret",
  } = process.env

const router = express.Router()

const signIn = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    userModel.findOne({where: {userName: username}})
        .then(data => {
            if (bcrypt.compareSync(password, data.password)) {
                const token = generateAccessToken(data.uuid)
                const headers = {
                    "authorization": `Bearer ${token}`,
                    'Access-Control-Expose-Headers': "authorization"
                }
                res.set(headers)
                res.status(200).send({
                    test: "lol",
                    message: "Login successful",
                })
            }
            else {
                res.send({
                    message: "Incorrect password",
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).send({
                message:
                err || "Some error occurred while authentifacting.",
            });
        });
}

const isAuthenticated = (req, res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        res.status(400).send({
            isAuthenticated: false 
        })
    } else {
        jwt.verify(token, toString(ACCESS_TOKEN_SECRET), (err, user) => {
            if (err) {
                res.status(400).send({
                    isAuthenticated: false,
                    message: "Invalid auth"
                })
            } else {
                res.status(200).send({
                    isAuthenticated: true 
                })
            }
        })
    } 
}

// Authnetification Router
router.post('/login', signIn)
router.post('/register', userController.create)
router.get('/isauth', isAuthenticated)
router.get('/test', (req, res) => {
    res.send({
        message: 'bedis'
    })
})

module.exports = router;

