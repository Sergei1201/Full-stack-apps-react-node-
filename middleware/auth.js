const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function(req, res, next) {
    // Getting the token from the header
    const token = req.header('x-auth-token')

    // Checking if not token
    if(!token) {
        res.status(401).json({msg: 'No token, authorization denied'})
    }

    // If there's a token, we need to verify it
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded.user
        next()
    } catch (err) {
        res.status(401).json({msg: 'Token is not valid'})
        
    }
}

