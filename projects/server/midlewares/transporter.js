const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_TRANSPORT,
        pass: process.env.EMAIL_TRANSPORT_CREDENTIAL
    },
    tls: {
        rejectUnauthorized: false
    }
})

module.exports = transporter