const expressJwt = require('express-jwt')

const PREFIX = 'Bearer ';
const jwt = require('jsonwebtoken');

function isAuthenticated() {
    return expressJwt({
        secret: process.env.JWT_SECRET,
        algorithms: ["HS256"],
        getToken: function(req) {
            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                return req.headers.authorization.split(' ')[1];
            } else if (req.cookies.auth && req.cookies.auth !== '') {
                req.headers.authorization = 'Bearer ' + req.cookies.auth
                return req.cookies.auth
            }
            return null
        }
    })
}

function isUserManager() {
    return (req, res, next) => {
        console.log('request headers', req.headers)
        var token = req.headers['authorization']
        console.log('token', token)
        if (token.startsWith(PREFIX)) {
            token = token.replace(PREFIX, '')
        } else {
            res.status(400).send('Token is not valid')
        }
        const decodedToken = jwt.decode(token, {json: true})
        console.log('decoded token', decodedToken);
        const role = decodedToken['role'].toLowerCase()
        if ( role === "manager") {
            console.log("User is manager")
            next()
        } else {
            res.status(401).send('User is not authorized')
        }
    }
} 

module.exports = {
    isAuthenticated,
    isUserManager,
}
