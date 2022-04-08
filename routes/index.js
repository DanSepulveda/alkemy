const express = require('express')
const userControllers = require('../controllers/userControllers')
const passport = require("passport").authenticate('jwt', { session: false })
const router = express.Router()

// ------------------- USERS -------------------
// Create new user
router.route('/signup')
    .post(userControllers.signup)

// Login user
router.route('/login')
    .post(userControllers.login)
    .get(passport, userControllers.verifyToken)

// Delete account
router.route('/user/:id')
    .delete(passport, userControllers.deleteAccount)

router.route('/users')
    .get(userControllers.getAllUsers)
    .delete(userControllers.deleteUsersTable)

module.exports = router