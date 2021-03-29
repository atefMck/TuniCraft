const jwt = require("jsonwebtoken");

require('dotenv').config();
const {
    ACCESS_TOKEN_SECRET = "defaultsecret",
  } = process.env

const generateAccessToken = (uuid) => {
    const token = jwt.sign({
            data: uuid
        }, toString(ACCESS_TOKEN_SECRET), { expiresIn: "1h" });
    return token
}

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, toString(ACCESS_TOKEN_SECRET), (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

module.exports = {
    generateAccessToken,
    authenticateToken
}