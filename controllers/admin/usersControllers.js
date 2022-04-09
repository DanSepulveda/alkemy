const pool = require('../../config/database')

const userControllers = {
    getAllUsers: async (req, res) => {
        const { admin } = req.user[0]
        try {
            // Checking if user is admin before accessing information
            if (!admin) throw new Error('Access denied')

            const users = await pool.query('SELECT * FROM users')
            res.status(200).json({ success: true, response: users })
        } catch (error) {
            res.json({ success: false, error: error.message })
        }
    },
    deleteUsersTable: async (req, res) => {
        const { admin } = req.user[0]
        try {
            // Checking if user is admin before deleting table
            if (!admin) throw new Error('Access denied')

            await pool.query('DROP TABLE users')
            res.status(200).json({ success: true })
        } catch (error) {
            res.json({ success: false, error: error.message })
        }
    }
}

module.exports = userControllers