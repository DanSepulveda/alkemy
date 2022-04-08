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
        // Creating database
        pool.query('CREATE DATABASE IF NOT EXISTS alkemy')

        // Creating users table
        pool.query('CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(20) NOT NULL, email VARCHAR(255) NOT NULL UNIQUE KEY, password VARCHAR(256) NOT NULL)')

        connection.release()
        console.log("Database connected")
    }
})

pool.query = promisify(pool.query)

module.exports = pool