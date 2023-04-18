const express = require('express')
const config = require('../configuration/config')
const { Configuration, OpenAIApi } = require('openai')
const router = new express.Router()
const { models } = require('./../db/connec')
const sequelize = require('./../db/connec');

const KEY = config.openaiKey
const configuration = new Configuration({
    apiKey: KEY
})

const openai = new OpenAIApi(configuration)

router.post('/get-recomended', async (req, res) => {
    let {question, productid} = req.body
    

    if(!question){
        question = 'slider horizontal' 
    }
    
    const possibilities = ['AGENTE','OFERTAS','INFORMACIÓN_PRODUCTO','TIEMPO_UBICACIÓN','ESTADO_DE_ORDEN_PEDIDO','POLITICAS','RECOMENDACION','DESPEDIDA','NO_HAY_COINCIDENCIAS']
    const possibilitiesString = JSON.stringify(possibilities)

    const firsInput = `cual de estas opciones ${possibilitiesString} concuerda mejor con este mensaje ${question} (sólo uno sin saltos de línea)`

    //const prompt = `dame un componente funcional react de: ${question} (dame solo el codigo sin librerias externas, NO IMPORTES REACT, el formato de la funcion debe ser: export default function MiComponente () { return(<div></div>)}, solo dame el componente funcional)`

   
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: firsInput,
        max_tokens: 100
    })
    let response = completion.data.choices[0].text
    response = response.replace(/\n/g, '')
    console.log(response)

    const secondInput = (query, data ) => {
        return (`actua como un profesional de atencion al cliente en un eccomerce. Consulta: ${query}. Informacion: ${data}`)
    }
    
    switch (response) {

        case 'INFORMACIÓN_PRODUCTO':
            const product = await models.products.findByPk(productid)
            const myProductParse = product.get({ plain: true });
            const productString = JSON.stringify(myProductParse)
        const input = secondInput(question, productString)
            
            const completion = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: input,
                max_tokens: 1000,
            })

        res.json([{type: 'CHAT', sender: 'assistant', data: completion.data.choices[0].text}])
            break;

        case 'OFERTAS':
            let ofertas = [
                { 
                  producto: 'camisa', 
                  descuento: 10, 
                  precio: 90 
                },
                { 
                  producto: 'zapatos', 
                  descuento: 20, 
                  precio: 80 
                },
                { 
                  producto: 'bolso', 
                  descuento: 30, 
                  precio: 70 
                }
              ];
            const ofertasString = JSON.stringify(ofertas)

            const completionOferts = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: secondInput(question, `OFERTAS: ${ofertasString}`),
                max_tokens: 1000
            })
        
            console.log(completionOferts.data.choices[0].text)
            res.json([
            {type: 'CHAT', 
            sender: 'assistant', 
            data: completionOferts.data.choices[0].text},
            ])
            break;

        case 'TIEMPO_UBICACIÓN':
            /*let directionData = [{
                provedorDirection:{
                    lat: 54,
                    lon: 76
                },
                custommerDirection:{
                    lat: 78,
                    lon: 789
                }
                }]
            const directionDataString = JSON.stringify(directionData)

            const completionTime = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: secondInput(question, `Ubicaciones: ${directionDataString}`),
                max_tokens: 1000
            })*/
            const ordersTime = await models.orders.findAll({
                where:{
                    userid: 1,
                },
                include:['myProduct']
            })
            const ordersTimeData = ordersTime.map(usuario => usuario.get({ plain: true }))
            res.json([
                {type: 'CHAT', 
                sender: 'assistant', 
                data: 'Por favor seleccione su orden'},
                {
                    type: 'ONECHECKTIME',
                    sender: 'assistant',
                    data: ordersTimeData,
                    aditionalData: question
                }])
            break;

        case 'ESTADO_DE_ORDEN_PEDIDO':
            

            const orders = await models.orders.findAll({
                where:{
                    userid: 1,
                },
                include:['myProduct']
            })
            const ordersData = orders.map(usuario => usuario.get({ plain: true }))
            console.log(ordersData)
            //console.log(completionState.data.choices[0].text)
            res.json([{
                type: 'CHAT', 
                sender: 'assistant', 
                data: 'Por favor indica (Selecciona) la orden'},
            {
                type: 'ONECHECK',
                sender: 'assistant',
                data: ordersData,
                aditionalData: question
            }])
            break;

        case 'POLITICAS': 
            let politics = 'Si por alguna razón no estás satisfecho con tu compra, puedes devolverla en un plazo de 14 días a partir de la fecha en que la recibiste. Si deseas devolver un producto, por favor contáctanos y te proporcionaremos una etiqueta de envío prepagada para que puedas devolver el producto sin costo adicional. Una vez que recibamos el producto devuelto, procesaremos el reembolso en un plazo de 14 días.'
            

            const completionPolitics = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: secondInput(question, `Politicas: ${politics}`),
                max_tokens: 1000
            })

            res.json([{type: 'CHAT', sender: 'assistant', data: completionPolitics.data.choices[0].text}])
            
            break;

        case 'RECOMENDACION': 
        const productData = await models.products.findByPk(productid,{
            include: ['myCategories']
        }) 
        const productParse = productData.get({ plain: true });
        //console.log(productParse)
        
        const recomendationsSequelize =  await models.products.findAll({
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
          const recomendations = recomendationsSequelize.map(resultado => resultado.get({ plain: true }));

        const recomendationsString = JSON.stringify(recomendations)

        const completionRecomendations = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: secondInput(question, `Recomendacion: ${recomendationsString}`),
            max_tokens: 1000
        })
    
        //console.log(completionOferts.data.choices[0].text)
        res.json([{type: 'CHAT', sender: 'assistant', data: completionRecomendations.data.choices[0].text}])
            break;

        case 'DESPEDIDA': 

        const completionBye = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `actua como un profesional de atencion al cliente y dile al cliente que si desea conocer las ofertas escriba explicitamente 'OFERTAS'. Esto te dijo el cliente: ${question}`,
            max_tokens: 1000
        })
    
        //console.log(completionOferts.data.choices[0].text)
        res.json([{type: 'CHAT', sender: 'assistant', data: completionBye.data.choices[0].text}])
            break;

        case 'NO_HAY_COINCIDENCIAS': 
        const completionNot = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `actua como un profesional de atencion al cliente y dile al cliente que si desea hablar con un agente para alguna consulta mas especifica escriba explicitamente 'AGENTE'. Esto te dijo el cliente: ${question}`,
            max_tokens: 1000
        })
    
        //console.log(completionOferts.data.choices[0].text)
        res.json([{type: 'CHAT', sender: 'assistant', data: completionNot.data.choices[0].text}])
            break;
        
        case 'AGENTE':
            res.json([{type: 'CHAT', sender: 'assistant', data:'Si desea hablar con un agente escriba AGENTE'}])
            break;
        default:
            console.log('indefinido')
            break;
    }
})

router.post('/order-data', async (req, res) => {
    let {question, orderid} = req.body
    
    const secondInput = (query, data ) => {
        return (`actua como un profesional de atencion al cliente en un eccomerce. Consulta: ${query}. Informacion: ${data}`)
    }
    

    const order = await models.orders.findByPk(orderid)
    const ordeData = order.get({plain: true}) 
    const orderString = JSON.stringify(ordeData)

    const completionState = await openai.createCompletion({

        model: "text-davinci-003",
        prompt: secondInput(question, `Estadodeorden: ${orderString}`),
        max_tokens: 1000
    })

    res.json([{
        type: 'CHAT', 
        sender: 'assistant', 
        data:completionState.data.choices[0].text}])
});
router.post('/order-time', async (req, res) => {
    let {question, orderid} = req.body
    console.log('orderTime')
    
    const secondInput = (query, data ) => {
        return (`actua como un profesional de atencion al cliente en un eccomerce. Consulta: ${query}. Informacion: ${data}`)
    }
    

    const order = await models.orders.findByPk(orderid ,{
        include: [{
            model: models.products,
            as: 'myProduct',
            include: [{
                model: models.providers,
                as: 'myProviders',
            }]
        }]
    })

    const ordeData = order.get({plain: true}) 
    console.log('ORDRRDATA')
    const latProvider = ordeData.myProduct.myProviders.ubicationlat
    const lngProvider = ordeData.myProduct.myProviders.ubicationlng
    const clienLat = 24
    const clienLng = 22
    function toRadians(degrees) {
        return degrees * Math.PI / 180;
      }

      function calculateDeliveryTime(clientLat, clientLng, providerLat, providerLng) {
        const earthRadius = 6371; // Radio de la Tierra en km
        const distanceLat = toRadians(providerLat - clientLat);
        const distanceLng = toRadians(providerLng - clientLng);
      
        const a = Math.sin(distanceLat / 2) * Math.sin(distanceLat / 2) +
                  Math.cos(toRadians(clientLat)) * Math.cos(toRadians(providerLat)) *
                  Math.sin(distanceLng / 2) * Math.sin(distanceLng / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = earthRadius * c; // Distancia en km
      
        const speed = 60; // Velocidad promedio en km/h
        const timeHours = distance / speed; // Tiempo en horas
        const timeSeconds = timeHours * 3600; // Tiempo en segundos
      
        return timeSeconds;
      }
    const deliveryTime = calculateDeliveryTime(clienLat, clienLng, parseFloat(latProvider), parseFloat(lngProvider))

    

    const completionTime = await openai.createCompletion({

        model: "text-davinci-003",
        prompt: secondInput(question, `tiempo aproximado de envio en segundos (convertirlo a horas de ser necesario ): ${deliveryTime}`),
        max_tokens: 1000
    })

    res.json([{
        type: 'CHAT', 
        sender: 'assistant', 
        data:completionTime.data.choices[0].text}])
});


module.exports = router 