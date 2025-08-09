const express = require('express')
const router = new express.Router()
const {models} = require('../db/connec')
const { authenticateToken } = require('../middlewares/authToken.middleware');
const { PREVIOUS_PURCHASES_TABLE } = require('../db/models/previouspurchases.model');
const { SHOPPING_CART_TABLE } = require('../db/models/shoppingcart.models');
const { PRODUCTS_TABLE } = require('../db/models/products.models');

router.post('/generate',
    authenticateToken,
    async (req,res) => {
    const userId = req.user.id

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

    const rsp = await models[PREVIOUS_PURCHASES_TABLE].create({
        userid: userId
    })

    res.json({purchaseId: rsp.id, totalPrice})
})

router.post('/onecheck', 
    authenticateToken,
    async (req,res) =>{
        const userId = req.user.id
        const {productId} = req.body

        const product = await models[PRODUCTS_TABLE].findByPk(productId)
        const rsp = await models[PREVIOUS_PURCHASES_TABLE].create({
        userid: userId})

        res.json({purchaseId: rsp.id, totalPrice: product.price})
})


module.exports = router 