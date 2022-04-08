const express = require('express')
const userControllers = require('../controllers/userControllers')
const passport = require("passport").authenticate('jwt', { session: false })
const router = express.Router()

// USERS
router.route('/signup')
    .post(userControllers.signup)

router.route('/login')
    .post(userControllers.login)
    .get(passport, userControllers.verifyToken)

router.route('/users')
    .delete(userControllers.deleteUsersTable)

module.exports = router