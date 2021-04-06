const jwt = require('jsonwebtoken')
const config = require('../config/config')

module.exports = {
    jwtSignUser(user) {
        let ONE_WEEK = 60 * 60 * 24 * 7
        const jwtToken = jwt.sign(user, config.authentication.jwtSecret, { expiresIn: ONE_WEEK })
        return jwtToken
    }
}