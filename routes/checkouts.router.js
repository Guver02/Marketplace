const express = require('express')
const router = new express.Router()
const axios = require('axios')

const HOST = 'http://localhost:3200/api/v1/checkouts'
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

router.post('/create-payment', async (req, res) => {
    const { price, purchaseid } = req.body
    console.log('BODY', req.body)
    const priceStr = price.toString()

    const order = {
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD',
                value: priceStr
            }
        }],
        application_context: {
            brand_name: `MiTienda.com`,
            landing_page: 'NO_PREFERENCE',
            user_action: 'PAY_NOW',
            return_url: `${HOST}/execute-payment/${purchaseid}`,
            cancel_url: `${HOST}/cancel-payment`
        }
    }

    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');

    const { data: { access_token } } = await axios.post(`${paypalApi.paypalSandbox}/v1/oauth2/token`, params, {
        auth: {
            username: env.marketplace.paypalClient,
            password: env.marketplace.paypalSecret
        }
    })
    const resp = await axios.post(`${paypalApi.paypalSandbox}/v2/checkout/orders`, order, {
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })

    res.json({ href: resp.data.links[1].href })
})

router.get('/execute-payment/:purchaseid', async (req, res) => {
    const { token } = req.query;
    console.log('EXECUTE TOKEN: ',token)
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

    res.send('Pago exitoso');

});

router.get('/cancel-payment', (req, res) => {
    res.send('Pago cancelado');
});




module.exports = router 