const pool = require('../config/database')

const budgetControllers = {
    createTransaction: async (req, res) => {
        const { description, type, amount, date, category_id } = req.body
        const user_id = req.user[0].id

        try {
            // Saving transaction
            const transaction = await pool.query(`INSERT INTO transactions VALUES (NULL, '${description}', '${type}', '${amount}', STR_TO_DATE('${date}', '%d-%m-%y'), '${category_id}', '${user_id}')`)

            res.status(200).json({ success: true, response: transaction.insertId })
        } catch (error) {
            res.json({ success: false, error: error.message })
        }
    },
    getUserTransactions: async (req, res) => {
        const user_id = req.user[0].id

        try {
            const transactions = await pool.query(`SELECT * FROM transactions WHERE user_id='${user_id}'`)
            // const transactions = await pool.query(`SELECT * FROM transactions INNER JOIN categories WHERE user_id='${user_id}'`)
            res.status(200).json({ success: true, response: transactions })
        } catch (error) {
            res.json({ success: false, error: error.message })
        }
    },
    getTransaction: async (req, res) => {
        const user_id = req.user[0].id
        try {
            const transaction = await pool.query(`SELECT * from transactions WHERE id=${req.params.id}`)

            // Checking if transaction belongs to user
            if (user_id != transaction[0].user_id) throw new Error('Access denied')

            res.status(200).json({ success: true, response: transaction })
        } catch (error) {
            res.json({ success: false, error: error.message })
        }
    },
    editTransaction: async (req, res) => {
        const values = Object.entries(req.body)
        let query = ''
        values.forEach((value, index) => {
            if (index === values.length - 1) {
                query += `${value[0]}="${value[1]}"`
            } else {
                query += `${value[0]}="${value[1]}", `
            }
        })
        try {
            await pool.query(`UPDATE transactions SET ${query} WHERE id=${req.params.id}`)
            res.status(200).json({ success: true })
        } catch (error) {
            res.json({ success: false, error: error.message })
        }
    },
    deleteTransaction: async (req, res) => {
        const user_id = req.user[0].id
        try {
            const transaction = await pool.query(`SELECT * from transactions WHERE id=${req.params.id}`)

            // Checking if transaction belongs to user
            if (user_id !== transaction.user_id) throw new Error('Access denied')

            await pool.query(`DELETE FROM transactions WHERE id='${req.params.id}'`)
            res.status(200).json({ success: true, response: 'Transaction deleted successfully' })
        } catch (error) {
            res.json({ success: false, error: error.message })
        }
    },
    getTransactions: async (req, res) => {
        try {
            let query = req.params.query
            if (!isNaN(query)) {
                query = ` LIMIT ${query}`
            } else if (query === 'all') {
                query = null
            } else {
                throw new Error()
            }
            const transactions = await pool.query(`SELECT transactions.id, transactions.description, transactions.type, transactions.amount, transactions.date, transactions.category_id as category, categories.name as category_name, categories.image as category_image FROM transactions INNER JOIN categories ON category_id=categories.id WHERE transaction.user_id=2`)
            // const transactions = await pool.query(`SELECT transactions.id, transactions.description, transactions.type, transactions.amount, transactions.date, transactions.category_id as category, categories.name, categories.image from transactions INNER JOIN categories ON category_id=categories.id ORDER BY date DESC${query ? query : ''}`)
            res.status(200).json({ success: true, response: transactions })
        } catch (error) {
            res.json({ success: false, error: error.message })
        }
    },
    getTransactionsPerType: async (req, res) => {
        try {
            let transactions = await pool.query(`SELECT transactions.id, transactions.description, transactions.type, transactions.amount, transactions.date, transactions.category_id as category, categories.name, categories.nombre, categories.image from transactions INNER JOIN categories ON category_id=categories.id WHERE transactions.type="${req.params.type}"`)
            res.status(200).json({ success: true, response: transactions })
        } catch (error) {
            res.json({ success: false, error: error.message })
        }
    },
    getResume: async (req, res) => {
        try {
            const expenses = await pool.query('SELECT SUM(amount) AS sum, COUNT(amount) AS count FROM transactions WHERE type="expenses"')
            const incomes = await pool.query('SELECT SUM(amount) AS sum, COUNT(amount) AS count FROM transactions WHERE type="incomes"')
            const resume = incomes[0].sum - expenses[0].sum
            res.status(200).json({ success: true, response: { expenses: expenses[0], incomes: incomes[0], resume } })
        } catch (error) {
            res.json({ success: false, error: error.message })
        }
    },
}

module.exports = budgetControllers