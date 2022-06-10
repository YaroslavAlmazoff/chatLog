const jwt = require('jsonwebtoken')
const {secret} = require('../config')

module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS') {
        return next()
    }

    try {
        console.log(req.headers.authorization)
        const token = req.headers.authorization.split(' ')[1]
        if(!token) {
            res.status(401).json({msg: 'no auth'})
        }
        const decoded = jwt.verify(token, secret)
        req.user = decoded
        next()
    } catch(e) {
        res.status(401).json({msg: 'no auth'})
        console.log(e)
    }
}