const express = require('express')
const router = new express.Router()
const {models} = require('../db/connec')
const sequelize = require('../db/connec');

router.get('/',async (req,res) =>{
    const userid = 1
    const rsp = await models.shoppingcart.findAll({
        where: {
            userid: userid
        }
    })

    res.json(rsp)
})

router.post('/add-product',async (req,res) =>{
    const {productid} = req.body
    console.log(productid)
    const userid = 1
    const rsp = await models.shoppingcart.create({
        productid: productid,
        userid: userid
    })

    res.json(rsp)
})

router.post('/clear', async (req,res) =>{
    //const {productid} = req.params
    const userid = 1
    try {
        await models.shoppingcart.destroy({
          where: {
            userid: userid
          }
        });
        console.log('Se eliminaron todas las filas donde userid=1.');
    } catch (error) {
        console.error('Error al eliminar las filas:', error);
    }
      

    res.json(userid)
})

module.exports = router 