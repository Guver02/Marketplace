const express = require('express')
const router = new express.Router()
const {models} = require('../db/connec')
const { authenticateToken } = require('../middlewares/authToken.middleware')
const { PaypalService } = require('../services/paypal.service')
const { SHOPPING_CART_TABLE } = require('../db/models/shoppingcart.models')
const { PRODUCTS_TABLE } = require('../db/models/products.models')

router.get('/',async (req,res) =>{
    const rsp = await models.products.findAll({
        where: {
            userid: 1
        }
    })
    res.json(rsp)
})

router.post('/add-orders',async (req,res) =>{
    const userid = 1
    const {orders} = req.body
    const rsp = await models.orders.bulkCreate(orders)

    res.json(rsp)
})

router.post('/product', 
    authenticateToken,
    async (req,res) =>{
        const userId = req.user.id
        const {productId} = req.body
        const clientOrigin = req.get('x-client-origin')

        const product = await models[PRODUCTS_TABLE].findByPk(productId)
        const totalPrice = product.dataValues.price

        const paypalService = new PaypalService()
        const {href} = await paypalService.generatePaypalCheckoutLink(totalPrice, 7, clientOrigin)
        res.json({href})
})

router.post('/cart',
    authenticateToken,
    async (req,res) => {
    const userId = req.user.id
    const clientOrigin = req.get('x-client-origin')

    const cart = await models[SHOPPING_CART_TABLE].findAll({
        where: { userid: userId },
        attributes: ['productid', 'quantity'],
        include: {model: models.products,
                    as: 'productInCart',
                    attributes: ['product', 'price']}
    })

    const totalPrice = cart.reduce((acc, item) => {
        return acc + (item.productInCart.price * item.quantity);
    }, 0);

    const paypalService = new PaypalService()
    const {href} = await paypalService.generatePaypalCheckoutLink(totalPrice, 7, clientOrigin)

    res.json({href})
})



module.exports = router 