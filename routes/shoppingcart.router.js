const express = require('express')
const router = new express.Router()
const { models } = require('../db/connec')
const { authenticateToken } = require('../middlewares/authToken.middleware');
const { SHOPPING_CART_TABLE } = require('../db/models/shoppingcart.models');

router.get('/my-cart',
    authenticateToken,
    async (req, res) => {
        try {
            const userID = req.user.id

            const shoppingCart = await models[SHOPPING_CART_TABLE].findAll({
                where: {
                    userid: userID
                },
                include: {
                    model: models.products,
                    as: 'productInCart',
                    attributes: ['id', 'product', 'price', 'image']
                }
            })

            res.json(shoppingCart)
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' })
        }
    })

router.post('/add-cartitem',
    authenticateToken,
    async (req, res) => {
        try {
            const userID = req.user.id
            const { productId, quantity } = req.body

            const cartItem = await models[SHOPPING_CART_TABLE].create({
                productid: productId,
                quantity: quantity,
                userid: userID
            })

            res.json(cartItem)
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' })
        }
    })

router.post('/clear-cart',
    authenticateToken,
    async (req, res) => {
        try {
            const userID = req.user.id

            const deleteCart = await models[SHOPPING_CART_TABLE].destroy({
                where: {
                    userid: userID
                }
            });

            res.json(deleteCart)
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' })
        }
    })

module.exports = router 