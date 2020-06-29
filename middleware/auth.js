const jwt = require('jsonwebtoken')
const JWT_KEY = 'sila_secret_key'
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
