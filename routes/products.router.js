const express = require('express')
const router = new express.Router()
const {models} = require('../db/connec')
const sequelize = require('../db/connec');

router.get('/',async (req,res) =>{
    const rsp = await models.products.findAll()
    res.json(rsp)
})

router.get('/:id',async (req,res) =>{
    const {id} = req.params
    const rsp = await models.products.findByPk(id,{
      include: ['myColors']
    })

    

    res.json(rsp)
})

router.get('/light/:id',async (req,res) =>{
  const {id} = req.params
  const rsp = await models.products.findByPk(id,{
    attributes: ['id', 'product', 'image']
  })
  res.json(rsp)
})

router.get('/test/:id',async (req,res) =>{
    const {id} = req.params
    console.log(id)
    const productData = await models.products.findByPk(id,{
        include: ['myCategories']
    }) 
    const productParse = productData.get({ plain: true });
    const rsp =  await models.products.findAll({
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