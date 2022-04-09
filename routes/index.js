const express = require('express')

// CONTROLLERS
const userControllers = require('../controllers/usersControllers')
const categoriesControllers = require('../controllers/categoriesControllers')
// ADMIN CONTROLLERS
const adminUsersControllers = require('../controllers/admin/usersControllers')
const adminCategoriesControllers = require('../controllers/admin/categoriesControllers')

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

// ------------------- USERS (Admin actions) -------------------
// Get all users and delete table
router.route('/users')
    .post(passport, userControllers.signup)
    .get(passport, adminUsersControllers.getAllUsers)
    .delete(passport, adminUsersControllers.deleteUsersTable)

// ------------------- CATEGORIES -------------------
router.route('/category/:id')
    .get(categoriesControllers.getCategoryById)
    .delete(passport, adminCategoriesControllers.deleteCategoryById) //admin action

// ------------------- CATEGORIES (Admin actions) -------------------
router.route('/categories')
    .post(passport, adminCategoriesControllers.createCategory)
    .put(passport, adminCategoriesControllers.editCategory)
    .delete(passport, adminCategoriesControllers.deleteCategoriesTable)
    .get(categoriesControllers.getAllCategories) //no admin action

module.exports = router