const express = require('express')
const router = new express.Router()
const { models } = require('../db/connec')
const sequelize = require('../db/connec');
const { PRODUCTS_TABLE } = require('../db/models/products.models');

router.get('/', async (req, res) => {
    const rsp = await models.products.findAll()

    res.json(rsp)
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    const rsp = await models.products.findByPk(id, {
        include: ['myColors']
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
        attributes: ['id', 'product', 'price', 'image']
    })

    const productsById = rsp.reduce((acc, product) => {
            acc[product.id] = product;
            return acc;
        }, {});

    res.json(productsById)
})

router.get('/light/:id', async (req, res) => {
    const { id } = req.params
    const rsp = await models.products.findByPk(id, {
        attributes: ['id', 'product', 'image']
    })
    res.json(rsp)
})

router.get('/test/:id', async (req, res) => {
    const { id } = req.params
    console.log(id)
    const productData = await models.products.findByPk(id, {
        include: ['myCategories']
    })
    const productParse = productData.get({ plain: true });
    const rsp = await models.products.findAll({
        attributes: ['id', 'product'],
        include: [
            {
                model: models.categories,
                as: 'myCategories',
                where: { id: productParse.myCategories[0].id },
                attributes: []
            }
        ],
        order: sequelize.literal('RAND()'),
        limit: 3
    });

    res.json(rsp)
})
module.exports = router 