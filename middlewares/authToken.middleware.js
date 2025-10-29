const jwt = require('jsonwebtoken')
const config = require('../configuration/config')
const {models} = require('../db/connec')
const { USERS_TABLE } = require('../db/models/users.model')

function authenticateToken (req, res, next){
    const token = req.cookies.token

    if (!token) return res.status(401).json({
            error: true,
            message: 'No token provided'
        })
    
    try {
        const decoded = jwt.verify(token, config.secret)

        req.user = {
            id: decoded.id,
            role: decoded.role
        }

        console.log(decoded)
        next()
    } catch (error) {
        res.status(403).json({
            error: true,
            message: 'Invalid token'
        })
    }
    
}

function authenticateUserByTokenDecoded(req, res, next){
    const user = req.user
    
    const userData = models[USERS_TABLE].findByPk(user.id)

    if (!userData) return res.status(400).json({
        error: true,
        message: 'User not exist'
    })

    next()
}

module.exports = {authenticateToken, authenticateUserByTokenDecoded}