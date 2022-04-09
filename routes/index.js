const express = require('express')
const userControllers = require('../controllers/usersControllers')
const adminUsersControllers = require('../controllers/admin/usersControllers')
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

// ------------------- ADMIN USERS -------------------
// Get all users and delete table
router.route('/users')
    .get(passport, adminUsersControllers.getAllUsers)
    .delete(passport, adminUsersControllers.deleteUsersTable)

module.exports = router