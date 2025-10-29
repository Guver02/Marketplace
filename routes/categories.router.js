const express = require('express')
const router = new express.Router()
const {models} = require('../db/connec')
const { PRODUCTS_TABLE } = require('../db/models/products.models')
const { PRODUCT_IMAGES_TABLE } = require('../db/models/productimages.models')

router.get('/all', async (req, res) =>{
    const categories = await models.categories.findAll()
    res.json(categories)
})

router.get('/get-products/:categoryid', async (req, res) =>{
    const {categoryid} = req.params
    const products = await models.categories.findByPk(categoryid, {
        include: {
            model: models[PRODUCTS_TABLE],
            as: 'myProduct',
            include: {
                model: models[PRODUCT_IMAGES_TABLE],
                as: 'images',
            }
        }
    })
    res.json(products)
})

router.get('/get-products-radom/:categoryid',async (req, res) =>{
})

module.exports = router