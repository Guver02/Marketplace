const express = require('express')
const router = new express.Router()
const { models } = require('../db/connec')
const sequelize = require('../db/connec');
const {authenticateToken} = require('../middlewares/authToken.middleware')
const { PRODUCTS_TABLE } = require('../db/models/products.models');
const { authorizationRole } = require('../middlewares/authorizationRole.middleware');
const { PRODUCT_IMAGES_TABLE } = require('../db/models/productimages.models');

router.get('/', async (req, res) => {
    const products = await models.products.findAll({
        include: ['images']
    })

    res.json(products)
})

router.get('/top-sales', async (req, res) => {

    const randomNumbers = [];
    for(let i = 0; i < 5 ; i++){
        randomNumbers.push(Math.floor(Math.random() * 21));
    }
    console.log(randomNumbers)


    const topSales = await models.products.findAll({
        where: {
            id: randomNumbers
        },
        include: ['images']
    })

    console.log(topSales)

    res.json(topSales)
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const rsp = await models.products.findByPk(id, {
        include: ['images']
    })

    res.json(rsp)
})



router.post('/by-ids', async (req, res) => {
    const { ids } = req.body

    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({
                error: true,
                message: 'Is not an array'
            });
    }

    const rsp = await models[PRODUCTS_TABLE].findAll({
        where: {
            id: ids
        },
        attributes: ['id', 'product', 'price'],
        include: ['images']
    })


    const productsPlain = rsp.map(product => product.get({ plain: true }));

    const productsById = productsPlain.reduce((acc, product) => {
            acc[product.id] = product;
            return acc;
        }, {});

    res.json(productsById)
})

router.post('/create', 
    authenticateToken,
    authorizationRole('seller'),
    async (req, res) => {
        const {product, urlImages} = req.body

        const productCreated = await models[PRODUCTS_TABLE].create({...product, providerid: req.user.id, image: '', rating: 0})
      
        const productImages = urlImages.map((url) => {
            return {
                productid: productCreated.id,
                imageurl: url
            }
        })

        await models[PRODUCT_IMAGES_TABLE].bulkCreate(productImages)
        
        res.json(productCreated)
})

module.exports = router 