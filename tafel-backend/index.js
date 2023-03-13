require('dotenv').config() //used for sensitive info
const config = require('./utils/config')
const logger = require('./utils/logger')
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
})
const cors = require('cors')
const mongoose = require('mongoose')
require('express-async-errors')

const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const middleware = require('./utils/middleware')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })

//app.use(express.static('build')) // Use Build
app.use(cors())
app.use(express.json())
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('canvas-data', (data) => {
        socket.broadcast.emit('canvas-data', data)
        console.log(data)
    })
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

const PORT = process.env.PORT
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


