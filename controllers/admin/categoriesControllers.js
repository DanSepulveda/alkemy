const pool = require('../../config/database')

const categoriesControllers = {
    createCategory: async (req, res) => {
        const { name, type, image } = req.body

        try {
            // Checking if category is being created by admin user
            if (!req.user[0].admin) throw new Error('Acceso denegado')

            // Saving category in database
            const category = await pool.query(`INSERT INTO categories VALUES (NULL, '${name}', '${type}', '${image}')`)
            const id = category.insertId

            res.status(200).json({ success: true, response: { id, name, type, image } })
        } catch (error) {
            res.json({ success: false, error: error.message })
        }
    },
    editCategory: async (req, res) => {
        const values = Object.entries(req.body)
        let query = ''

        // Creating query dynamically
        values.forEach((value, index) => {
            if (index === values.length - 1) {
                query += `${value[0]}='${value[1]}'`
            } else {
                query += `${value[0]}='${value[1]}', `
            }
        })

        try {
            // Checking if category is being updated by admin user
            if (!req.user[0].admin) throw new Error('Acceso denegado')

            const category = await pool.query(`UPDATE categories SET ${query} WHERE id=${req.params.id}`)

            // Throwing error if category doesn't exist
            if (category.affectedRows === 0) throw new Error('No existe la categoría')
            res.status(200).json({ success: true, response: 'Categoría modificada correctamente' })
        } catch (error) {
            res.json({ success: false, error: error.message })
        }
    },
    deleteCategoriesTable: async (req, res) => {
        const { admin } = req.user[0]
        try {
            // Checking if user is admin before deleting table
            if (!admin) throw new Error('Access denied')

            await pool.query('DROP TABLE categories')
            res.status(200).json({ success: true, message: 'Table categories deleted successfully' })
        } catch (error) {
            res.json({ success: false, error: error.message })
        }
    },
    deleteCategoryById: async (req, res) => {
        const { admin } = req.user[0]
        try {
            // Checking if user is admin before deleting category
            if (!admin) throw new Error('Acceso denegado')

            const category = await pool.query(`DELETE FROM categories WHERE id='${req.params.id}'`)

            // Checking id category exists
            if (category.affectedRows === 0) throw new Error('No existe la categoría')

            res.status(200).json({ success: true, response: 'Categoría eliminada correctamente' })
        } catch (error) {
            res.json({ success: false, error: error.message })
        }
    }
}

module.exports = categoriesControllers