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

class PaypalService {

    async generatePaypalCheckoutLink(priceStr, purchaseId, clientOrigin, currencyCode = 'USD') {
        try {
            const order = {
                intent: 'CAPTURE',
                purchase_units: [{
                    amount: {
                        currency_code: currencyCode,
                        value: priceStr
                    }
                }],
                application_context: {
                    brand_name: `MiTienda.com`,
                    landing_page: 'NO_PREFERENCE',
                    user_action: 'PAY_NOW',
                    return_url: `${HOST}/execute-payment/${purchaseId}?clientOrigin=${clientOrigin}`,
                    cancel_url: `${HOST}/cancel-payment/${purchaseId}?clientOrigin=${clientOrigin}`
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
            const response = await axios.post(`${paypalApi.paypalSandbox}/v2/checkout/orders`, order, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            const approveLink = response.data.links.find(link => link.rel === 'approve');
            if (!approveLink) {
                throw new Error('No se encontró el enlace de aprobación en la respuesta de PayPal');
            }
            return { href: approveLink.href };

        } catch (error) {
            console.error(error.response?.data || error.message);
            throw new Error('No se pudo iniciar el checkout de PayPal');
        }
    }
}

module.exports = {PaypalService}