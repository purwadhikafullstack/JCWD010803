const jwt = require('jsonwebtoken')

module.exports = {
    verifyToken : (req, res, next) => {
        try {
            let token = req.headers.authorization
            token = token.split(' ')[1]
            if (!token) throw{
                message : "token is empty"
            }
            let verifiedAccount = jwt.verify(token, 'key')
            req.user = verifiedAccount
            next()
        } catch (error) {
            res.status(400).send(error)
        }
    }
}