const passport = require('passport')
const jwtStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt
const pool = require('./database')

module.exports = passport.use(new jwtStrategy({
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRETORKEY
}, (payload, done) => {
    pool.query(`SELECT * FROM users WHERE id='${payload.id}'`)
        .then(res => {
            if (!res.length) {
                return done(null, false)
            } else {
                return done(null, res)
            }
        })
        .catch(error => done(error, false))
}))