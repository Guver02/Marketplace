const express = require('express')
const router = new express.Router()
const {models} = require('../db/connec')
const sequelize = require('../db/connec');

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

module.exports = router 