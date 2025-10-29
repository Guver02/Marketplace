const express = require('express')
const router = new express.Router()
const axios = require('axios')

const paypalApi = {
    paypalSandbox: 'https://api-m.sandbox.paypal.com',
    paypalLive: 'https://api-m.paypal.com',
}
const env = {
    marketplace: {
        paypalClient: 'AeUsKNGKWk-9Gm_Y9nrv4pWQl1Xl-Rial3IHQt-EMw1MVnLAbwCQNW35adrWaNpaJ87T60uqB6lqkKNR',
        paypalSecret: 'EJ5fMK4NksmYzXrRqdlepbhar18HYH2-KLo8LoK-zYlB2NgCKTr1_OeLrW5ErsQXJss3r9g8SffxcDme'
    }
}

router.get('/execute-payment/:purchaseid', async (req, res) => {
    const { token, clientOrigin } = req.query;
   
    const response = await axios.post(
        `${paypalApi.paypalSandbox}/v2/checkout/orders/${token}/capture`,
        {},
        {
            auth: {
                username: env.marketplace.paypalClient,
                password: env.marketplace.paypalSecret,
            },
        }
    );

    console.log(response.data);

    res.redirect(`${clientOrigin}/#/success/26`);
});

router.get('/cancel-payment/:purchaseid', (req, res) => {
    const { clientOrigin } = req.query;
    res.redirect(`${clientOrigin}/#/cancel`);
});

module.exports = router 