const express = require('express')
const cors = require('cors')
require('dotenv').config()
require('./config/database')

const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))