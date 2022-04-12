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

        // Checking if new user is admin
        const admin = req.body.admin ? 1 : 0

        try {
            // Checking if email is registered
            const user = await pool.query(`SELECT email FROM users WHERE email = '${email}'`)
            if (user.length) throw new Error('Email already in use')

            // Checking if new admin is being created by another admin
            if (admin && !req.user[0].admin) {
                throw new Error('Access denied')
            }

            // Creating new user in database
            const newUser = await pool.query(`INSERT INTO users VALUES (NULL, '${username}', '${email}', '${hashedPass}', '${admin}')`)
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
        // The request only comes here if token is correct
        const { username, email, id } = req.user[0]
        res.status(200).json({ success: true, response: { id, username, email } })
    },
    deleteAccount: async (req, res) => {
        const userPassword = req.body.password
        const { id } = req.params
        const { password } = req.user[0]

        try {
            // Checking if password is correct before deleting account
            const passMatch = bcrypt.compareSync(userPassword, password)
            if (!passMatch) throw new Error('Incorrect Password')

            // Deleting account
            await pool.query(`DELETE FROM users WHERE id = '${id}'`)
            res.status(200).json({ success: true, response: 'Account deleted successfully' })
        } catch (error) {
            res.json({ success: false, error: error.message })
        }
    }
}

module.exports = userControllers