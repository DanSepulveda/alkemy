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

// Get all users, delete users table and create new admin
router.route('/users')
    .post(passport, userControllers.signup)                                 // ADMIN ACTION
    .get(passport, adminUsersControllers.getAllUsers)                       // ADMIN ACTION
    .delete(passport, adminUsersControllers.deleteUsersTable)               // ADMIN ACTION

// ------------------- CATEGORIES -------------------
// Get all categories, create new category and delete category table
router.route('/categories')
    .get(categoriesControllers.getAllCategories)
    .post(passport, adminCategoriesControllers.createCategory)              // ADMIN ACTION
    .delete(passport, adminCategoriesControllers.deleteCategoriesTable)     // ADMIN ACTION

// Get one category, edit category and delete one category
router.route('/category/:id')
    .get(categoriesControllers.getCategoryById)
    .put(passport, adminCategoriesControllers.editCategory)                 // ADMIN ACTION
    .delete(passport, adminCategoriesControllers.deleteCategoryById)        // ADMIN ACTION

// ------------------- TRANSACTIONS -------------------
// Create transaction, get transactions by user and delete transactions table
router.route('/transactions')
    .post(passport, transactionsControllers.createTransaction)
    .get(passport, transactionsControllers.getUserTransactions)
    .delete(passport, adminTransactionsControllers.deleteTransactionsTable) // ADMIN ACTION

// Get one transaction, edit one transaction and delete one transaction
router.route('/transaction/:id')
    .get(passport, transactionsControllers.getTransaction)
    .put(passport, transactionsControllers.editTransaction)
    .delete(passport, transactionsControllers.deleteTransaction)

router.route('/transactions/:query')
    .get(transactionsControllers.getTransactions)

router.route('/transactions/cat/:type')
    .get(transactionsControllers.getTransactionsPerType)

router.route('/resume')
    .get(transactionsControllers.getResume)

module.exports = router