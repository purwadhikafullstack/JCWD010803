const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hamidiakmal193@gmail.com',
        pass: 'mrzvwblawaxycbbp'
    },
    tls: {
        rejectUnauthorized: false
    }
})

module.exports = transporter