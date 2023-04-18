const express = require('express')
const router = new express.Router()
const {models} = require('../db/connec')
const sequelize = require('../db/connec');

router.post('/generate',async (req,res) =>{
    const userid = 1
    const {productsPurchases} = req.body
    console.log('PRODUCTSARRAY',productsPurchases)

    const rsp = await models.previouspurchases.create({
        userid: userid
    })

    const productsPurchaseData = productsPurchases.map((elem) => {
        return {
            purchaseid: rsp.id,
            productid: elem.id
        }
    }) 

    
    const data = await models.productspurchase.bulkCreate(productsPurchaseData)
    res.json(rsp)
})

router.post('/confirm/:purchaseid',async (req,res) =>{
    const userid = 1
    const {purchaseid} = req.params

    

    res.json(rsp)
})


module.exports = router 