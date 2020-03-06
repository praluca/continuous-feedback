const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    let token = req.header('Authorization')
    if(!token) return res.status(401).send('Access denied')

    try {
        let decoded=jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    } catch(err) {
        res.status(404).send('Invalid token')
    }
}