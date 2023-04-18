const express = require('express')
const router = new express.Router()
const {models} = require('../db/connec')
const sequelize = require('../db/connec');

router.get('/all',async (req,res) =>{
    const rsp = await models.categories.findAll({
     
    })
    res.json(rsp)
})

router.get('/get-products/:categoryid',async (req,res) =>{
    const userid = 1
    const {categoryid} = req.params
    const rsp = await models.categories.findByPk(categoryid, {
        include: ['myProduct']
    })

    res.json(rsp)
})

router.get('/get-products-radom/:categoryid',async (req,res) =>{
    const userid = 1
    const {categoryid} = req.params
    const rsp = await models.categories.findByPk(categoryid, {
        order: sequelize.literal('random()'),
        limit: 3,
        include: ['myProduct']
    })

    res.json(rsp)
})
module.exports = router