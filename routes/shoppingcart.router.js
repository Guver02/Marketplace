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
            })

            res.json(shoppingCart)
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' })
        }
    })

router.post('/item/:productId',
    authenticateToken,
    async (req, res) => {
        try {
            const userID = req.user.id
            const { productId } = req.params
            const { quantity } = req.body

            const [item, created] = await models[SHOPPING_CART_TABLE].findOrCreate({
                where: {
                    productid: productId,
                    userid: userID
                }
            })

            if (!created) {
                item.quantity += quantity ? quantity : 1
                await item.save()
            }

            res.status(200).json({ message: 'Producto agregado o actualizado', item });
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Internal Server Error' })
        }
    })

router.delete('/item/:productId',
    authenticateToken,
    async (req, res) => {
        try {
            const userID = req.user.id
            const { productId } = req.params

            await models[SHOPPING_CART_TABLE].destroy({
                where: {
                    userid: userID,
                    productid: productId
                }
            });

            res.status(200).json({ error: false, message: 'Producto eliminado del carrito' });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' })
        }
    })

router.delete('/clear',
    authenticateToken,
    async (req, res) => {
        try {
            const userID = req.user.id

            await models[SHOPPING_CART_TABLE].destroy({
                where: {
                    userid: userID
                }
            });

            res.status(200).json({ error: false, message: 'Carrito vaciado' });
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' })
        }
    })

module.exports = router 