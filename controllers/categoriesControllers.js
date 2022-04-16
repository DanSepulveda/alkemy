const pool = require('../config/database')

const categoriesControllers = {
    getCategoryById: async (req, res) => {
        try {
            const category = await pool.query(`SELECT * FROM categories WHERE id='${req.params.id}'`)
            res.status(200).json({ success: true, response: category[0] || 'No existe la categoría' })
        } catch (error) {
            res.json({ success: false, error: error.message })
        }
    },
    getAllCategories: async (req, res) => {
        try {
            const categories = await pool.query('SELECT * FROM categories ORDER BY name ASC')
            res.status(200).json({ success: true, response: categories })
        } catch (error) {
            res.json({ success: false, error: error.message })
        }
    },
}

module.exports = categoriesControllers