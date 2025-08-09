const express = require('express')
const { authenticateToken, authenticateUserByTokenDecoded } = require('../middlewares/authToken.middleware')
const { USERS_TABLE } = require('../db/models/users.model')
const router = new express.Router()
const { models } = require('../db/connec')

router.get('/my-user',
    authenticateToken,
    authenticateUserByTokenDecoded,
    async (req, res) => {
        try {
            const user = req.user

            const userData = await models[USERS_TABLE].findByPk(user.id)

            res.json(userData)
        } catch (error) {
            res.status(500).json({ error: true, message: 'Internal Server Error' })
        }

    })

router.get('/all', 
    authenticateToken,
    authenticateUserByTokenDecoded,
    async (req, res) => {
        const users = await models[USERS_TABLE].findAll()

        res.json(users)
})

router.post('/update-role',
    authenticateToken,
    async (req, res) => {
        const user = req.user
        const { role } = req.body

        await models[USERS_TABLE].update({
            role: role
        }, {
            where: {
                id: user.id
            }
        })

        res.json({
            error: false,
            message: 'Role updated'
        })
    }
)

module.exports = router