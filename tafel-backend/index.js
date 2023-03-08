require('dotenv').config() //used for sensitive info
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

//app.use(express.static('build')) // Use Build
app.use(cors())

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>')
})

io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('canvas-data', (data) => {
        socket.broadcast.emit('canvas-data', data)
        console.log(data)
    })
})

const PORT = process.env.PORT
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})