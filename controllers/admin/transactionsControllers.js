const pool = require('../../config/database')

const budgetControllers = {
    deleteTransactionsTable: async (req, res) => {
        const { admin } = req.user[0]
        try {
            // Checking if user is admin before deleting table
            if (!admin) throw new Error('Access denied')

            await pool.query('DROP TABLE transactions')
            res.status(200).json({ success: true, message: 'Table transactions deleted successfully' })
        } catch (error) {
            res.json({ success: false, error: error.message })
        }
    }
}

module.exports = budgetControllers