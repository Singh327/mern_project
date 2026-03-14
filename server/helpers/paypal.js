const paypal = require('paypal-rest-sdk');

paypal.configure({
    mode : 'sandbox',
    client_id : process.env.client_id,
    client_secret :process.env.client__secret
})

module.exports = paypal;