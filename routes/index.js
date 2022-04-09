const express = require('express')
const passport = require("passport").authenticate('jwt', { session: false })
const router = express.Router()

// CONTROLLERS
const userControllers = require('../controllers/usersControllers')
const categoriesControllers = require('../controllers/categoriesControllers')
const transactionsControllers = require('../controllers/transactionsControllers')
// ADMIN CONTROLLERS
const adminUsersControllers = require('../controllers/admin/usersControllers')
const adminCategoriesControllers = require('../controllers/admin/categoriesControllers')
const adminTransactionsControllers = require('../controllers/admin/transactionsControllers')

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

// ------------------- TRANSACTIONS -------------------
router.route('/transactions')
    .post(passport, transactionsControllers.createTransaction) //ok
    .get(passport, transactionsControllers.getUserTransactions) //ok
    .delete(passport, adminTransactionsControllers.deleteTransactionsTable) //admin action

router.route('/transaction/:id')
    .get(passport, transactionsControllers.getTransaction) //ok
    .put(passport, transactionsControllers.editTransaction)
    .delete(passport, transactionsControllers.deleteTransaction)

router.route('/transactions/:query')
    .get(transactionsControllers.getTransactions)

router.route('/transactions/cat/:type')
    .get(transactionsControllers.getTransactionsPerType)



router.route('/resume')
    .get(transactionsControllers.getResume)

module.exports = router