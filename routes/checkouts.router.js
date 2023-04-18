const express = require('express')
const router = new express.Router()
const axios = require('axios')
const request = require('request')
const {models} = require('../db/connec')
const sequelize = require('../db/connec');

const CLIENT = 'AX3_84srcfam64NkthR-XfJpcAbAxsaSl0Evgp9v1VVXqUAEj4iVKuh6mZM5I4GZl9O9YcZQL8idO_GG';
const SECRET = 'ECvyuk20kjDYNLXOU0CftWyzNONNGxbuNOVWOCm14XlxuEmBynX-SiKw9BOkuadT1NrxT__rdYfOEHh5';
const PAYPAL_API = 'https://api-m.sandbox.paypal.com'; // Live https://api-m.paypal.com

const auth = { user: CLIENT, pass: SECRET }

router.post('/create-payment',async (req,res) =>{
    
    const {price, purchaseid} = req.body
    console.log(price, purchaseid)

    const priestr = price.toString()
    const body = {
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD', //https://developer.paypal.com/docs/api/reference/currency-codes/
                value: priestr
            }
        }],
        application_context: {
            brand_name: `MiTienda.com`,
            landing_page: 'NO_PREFERENCE', // Default, para mas informacion https://developer.paypal.com/docs/api/orders/v2/#definition-order_application_context
            user_action: 'PAY_NOW', // Accion para que en paypal muestre el monto del pago
            return_url: `http://localhost:3100/api/v1/checkouts/execute-payment/${purchaseid}`, // Url despues de realizar el pago
            cancel_url: `http://localhost:3100/cancel-payment` // Url despues de realizar el pago
        }
    }
    //https://api-m.sandbox.paypal.com/v2/checkout/orders [POST]

    request.post(`${PAYPAL_API}/v2/checkout/orders`, {
        auth,
        body,
        json: true
    }, (err, response) => {

        if(err){
            console.log(err)
        }
        const data = response.body

        console.log(response.body)

        res.json(response.body.links[1])
    })

})

router.get('/execute-payment/:purchaseid', (req, res) => {
    const {purchaseid} = req.params
    const userid = 1
    const token = req.query.token; //<-----------
    console.log(req)
    request.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {
        auth,
        body: {},
        json: true
    }, async (err, response) => {
        
        console.log('PARECE QUE FUNCIONO', response.body)
        
        //crear la orden

        const purchaseItem = await models.previouspurchases.findByPk(purchaseid)
    const rsp = await purchaseItem.update({
        completed: true
    })

    const products = await models.productspurchase.findAll({
        where: {
            purchaseid: purchaseid
        }
    })

    const plainProducts = products.map((product) => {
        return product.toJSON()
    })

    const ordersData = plainProducts.map((elem) => {
        return {
            userid: userid,
            productid: elem.productid
        }
    })

    await models.orders.bulkCreate(ordersData)

        //

        res.redirect('http://localhost:3100')
    })

})


module.exports = router 