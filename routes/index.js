const routerRecommended = require('./recomended.router')
const routerProducts = require('./products.router')
const routerCheckouts = require('./checkouts.router')
const routerShoppingcart = require('./shoppingcart.router')
const routerPurchase = require('./purchase.router')
const routerCategories = require('./categories.router')
const routerAuth = require('./auth.router')
const routerUsers = require('./users.router')
const express = require('express')

function routerApi (app){
    const routerv1 = new express.Router()
    
    routerv1.use('/recommended',routerRecommended)
    routerv1.use('/products',routerProducts)
    routerv1.use('/checkouts', routerCheckouts)
    
    routerv1.use('/purchase', routerPurchase)
    routerv1.use('/categories', routerCategories)

    routerv1.use('/auth', routerAuth)
    routerv1.use('/users', routerUsers)
    routerv1.use('/shoppingcart', routerShoppingcart)
    
    app.use('/api/v1',routerv1)

}

module.exports = routerApi