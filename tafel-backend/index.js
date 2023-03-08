require('dotenv').config() //used for sensitive info
const express = require('express')
const app = express()
//const cors = require('cors')

//app.use(express.static('build')) // Use Build
//app.use(cors())

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})