const mysql = require('mysql')
const { promisify } = require('util')

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
})

pool.getConnection((err, connection) => {
    if (err) {
        console.log(err)
        return
    }
    if (connection) {
        pool.query('CREATE DATABASE IF NOT EXISTS alkemy')
        connection.release()
        console.log("Database connected")
    }
})

pool.query = promisify(pool.query)

module.exports = pool