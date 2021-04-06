const User = require('../../models').user
const { Op } = require("sequelize");
const JwtHelpers = require('../../helpers/jwt')

module.exports = {
    register(req, res) {
        User.create(req.body).then(data => {
            if (!data) {
                res.status(500).send({
                    error: 'An error has occured when trying to register'
                })
            }
            res.json({
                user: data,
                token: JwtHelpers.jwtSignUser(data.toJSON())
            })
        }).catch(err => {
            res.status(400).send({
                error: err.errors[0].message.replace(".", " ").replace('null', 'empty.').replace('must be unique', 'already exists.')
            })
        })
    },
    async login(req, res) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({
                where: {
                    [Op.or]: [
                        {
                            email: email
                        },
                        {
                            username: email
                        }
                    ]
                }
            })

            if (user === null) {
                return res.status(403).send({
                    error: `The login information was incorrect`
                })
            }
            const isPasswordValid = await user.comparePassword(password)
            if (!isPasswordValid) {
                return res.status(403).send({
                    error: 'The login information was incorrect'
                })
            }
            res.send({
                user: user,
                token: JwtHelpers.jwtSignUser(user.toJSON())
            })
        }
        catch (err) {
            return res.status(500).send({
                error: 'An error has occured when trying to login' + err
            })
        }
    }
}
