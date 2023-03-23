const express = require('express')
const config = require('../configuration/config')
const { Configuration, OpenAIApi } = require('openai')
const router = new express.Router()
const { models } = require('./../db/connec')
const sequelize = require('./../db/connec');


router.post('/get-recomended', async (req, res) => {
    const { question} = req.body
    const KEY = config.openaiKey
    

    const prompt = `dame un componente funcional react de: ${question} (dame solo el codigo sin librerias externas, NO IMPORTES REACT, el formato de la funcion debe ser: export default function MiComponente () { return(<div></div>)}, solo dame el componente funcional)`
    

    const configuration = new Configuration({
        apiKey: KEY
    })

    const openai = new OpenAIApi(configuration)
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 1000,
    })
    const resString = completion.data.choices[0].text
   
    console.log('RESPUESTA',resString)
    res.json(resString)
})



module.exports = router 