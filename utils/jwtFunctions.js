const jwt = require('jsonwebtoken')
const config = require('../configuration/config')

const generateAccessToken = (payload) => {
    return jwt.sign(payload, config.secret, {
        expiresIn: '30d'
    })
}

module.exports = {
    generateAccessToken
}