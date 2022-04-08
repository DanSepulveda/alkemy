const express = require('express')
const userControllers = require('../controllers/userControllers')
const router = express.Router()

// USERS
router.route('/signup')
    .post(userControllers.signup)

router.route('/login')
    .post(userControllers.login)

router.route('/users')
    .delete(userControllers.deleteUsersTable)

module.exports = router