//const routerInbox = require('./inbox.router')
//const routerDnotify = require('./dnotify.router')
const routerRecommended = require('./recomended.router')

const express = require('express')
//const router = require('./auth.router')

function routerApi (app){
    const routerv1 = new express.Router()
    
    routerv1.use('/recommended',routerRecommended)
    //routerv1.use('/dnotify',routerDnotify)


    app.use('/api/v1',routerv1)

}

module.exports = routerApi