const jwt = require('jsonwebtoken')
const config = require('config')
const JWT_KEY = config.get('JWT_KEY')
module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            throw new Error('Authentication failed!')
        }
        const decodedToken = jwt.verify(token, JWT_KEY)
        req.userData = { userId: decodedToken.userId }
        return next()
    } catch (err) {
        console.log(err)
        const error = res.status(401).send('Authentication failed!')
        return next(error)
    }
}
