const pool = require('../config/database')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const userControllers = {
    signup: async (req, res) => {
        let { email, username, password } = req.body

        // Encrypting password and normalizing user info
        const hashedPass = await bcrypt.hashSync(password, 10)
        email = email.toLowerCase()
        username = username.toLowerCase()

        try {
            await pool.query('CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(20) NOT NULL, email VARCHAR(255) NOT NULL UNIQUE KEY, password VARCHAR(256) NOT NULL, admin BOOL NOT NULL)')

            // Checking if email is registered
            const user = await pool.query(`SELECT email FROM users WHERE email = '${email}'`)
            if (user.length) throw new Error('Email already in use')

            // Creating new user in database
            const newUser = await pool.query(`INSERT INTO users VALUES (NULL, '${username}', '${email}', '${hashedPass}', false)`)
            const id = newUser.insertId

            // Generating token for new user
            const token = jwt.sign({ username, email, id }, process.env.SECRETORKEY)

            res.status(200).json({ success: true, response: { id, username, email, token } })
        } catch (error) {
            res.json({ success: false, error: error.message })
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body
        try {
            // Checking if user exists
            const user = await pool.query(`SELECT * FROM users WHERE email = '${email}'`)
            if (!user.length) throw new Error("User doesn't exist")

            // Checking if password is correct
            const passMatch = await bcrypt.compareSync(password, user[0].password)
            if (!passMatch) throw new Error('Password incorrect')

            // Getting user info from database and generating token
            const { username, id } = user[0]
            const token = jwt.sign({ username, email, id }, process.env.SECRETORKEY)

            res.status(200).json({ success: true, response: { id, username, email, token } })
        } catch (error) {
            res.json({ success: false, error: error.message })
        }
    },
    verifyToken: async (req, res) => {

    },
    deleteAccount: async (req, res) => {

    },
    deleteUsersTable: async (req, res) => {
        try {
            await pool.query('DROP TABLE users')
            res.status(200).json({ success: true })
        } catch (e) {
            res.json({ success: false })
        }
    }
}

module.exports = userControllers