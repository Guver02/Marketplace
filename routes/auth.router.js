const express = require('express')
const router = new express.Router()
const {models} = require('../db/connec')
const { USERS_TABLE } = require('../db/models/users.model')
const { generateAccessToken } = require('../utils/jwtFunctions')
const bcrypt = require('bcrypt')
const {  getClientIP } = require('../utils/utilsFunctions')
const { authenticateToken, authenticateUserByTokenDecoded } = require('../middlewares/authToken.middleware')

const options = {
        httpOnly: false,
        secure: false,
        //SameSite: 'Lax',
        maxAge: 30 * 24 * 60 * 60 * 1000
    }

router.post('/login', async (req, res) => {
    const { username, email, password } = req.body

    const userData = await models[USERS_TABLE].findOne({
        where: {
            email: email,
        }
    })

    if (!userData) return res.status(400).json({
        error: true,
        message: 'User not exist'
    })

    if (!bcrypt.compareSync(password, userData.password)) return res.status(400).json({
        error: true,
        message: 'Incorrect credentials'
    })

    const userPlain = userData.get({plain: true})
    delete userPlain.password
    delete userPlain.userip

    const payload = {user: userData.user, id: userData.id}    
    const token = generateAccessToken(payload)

    res.cookie('token', token, options)

    res.json({
        error: false,
        user: userPlain,
        token: token
    })
})

router.post('/signup', async (req, res) => {
    //Add middleware for validation
    const {username, email, password} = req.body

    const encriptedPassword = await bcrypt.hash(password, 10)
    const userIp = getClientIP(req)

    const data = await models[USERS_TABLE].create({
        username: username,
        email: email,
        password: encriptedPassword,
        userip: userIp
    })

    if (!data) res.status(400).json({
        error: true,
        message: 'User not created'
    })

    const userPlain = data.get({plain: true})
    delete userPlain.password
    delete userPlain.userip
    
    const payload = {user: userPlain.user, id: userPlain.id}    
    const token = generateAccessToken(payload)

    res.cookie('token', token, options)

    res.json({
        error: false,
        user: userPlain,
        token: token
    })
})

router.get('/logout', (req, res) => {
    res.clearCookie('token')

    res.status(200).json({
        error: false,
        message: 'Logout successful'
    })
})

router.get('/status',
    authenticateToken,
    authenticateUserByTokenDecoded,
    (req, res) => {
        
        if (!req.user) return res.status(401).json({
            error: true,
            message: 'Unauthorized'
        })

        res.json({
            error: false,
            loggedIn: true, 
        })
})

module.exports = router