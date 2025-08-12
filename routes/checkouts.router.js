const express = require('express')
const router = new express.Router()
const axios = require('axios')



router.post('/create-payment', async (req, res) => {
    const clientOrigin = req.get('x-client-origin')
    
    const { price, purchaseid } = req.body
    
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
            return_url: `${HOST}/execute-payment/${purchaseid}?clientOrigin=${clientOrigin}`,
            cancel_url: `${HOST}/cancel-payment/${purchaseid}?clientOrigin=${clientOrigin}`
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