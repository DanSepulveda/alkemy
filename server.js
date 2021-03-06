const express = require('express')
const cors = require('cors')
require('dotenv').config()
require('./config/database')
require('./config/passport')
const router = require('./routes/index')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', router)

const PORT = process.env.PORT || 4000

app.listen(PORT, '0.0.0.0', () => console.log(`Server listening on port ${PORT}`))