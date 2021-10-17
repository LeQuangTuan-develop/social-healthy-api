const express = require('express')
const cors = require('cors');
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const path = require('path')

const db = require('./api/config/db')
const route = require('./api/routes')

db.connect()

dotenv.config()

const app = express()
const port = process.env.PORT || 8080

// middleware
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))
app.use(cors())
app.use("/images", express.static(path.join(__dirname, 'public/images')))

var io = require('socket.io')
  ({
    path: '/io/webrtc'
  }, {
    cors: {
      origin: "*"
    }
  })

route(app)


//https://expressjs.com/en/guide/writing-middleware.html
app.use(express.static(__dirname + '/build'))
app.get('/', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.sendFile(__dirname + '/build/index.html')
})


const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`))

io.listen(server)

// default namespace
io.on('connection', socket => {
  console.log('connected')
})

io.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

// https://www.tutorialspoint.com/socket.io/socket.io_namespaces.htm
const peers = io.of('/webrtcPeer')

// keep a reference of all socket connections
let connectedPeers = new Map()

peers.on('connection', socket => {

  console.log(socket.id)
  socket.emit('connection-success', { success: socket.id })

  connectedPeers.set(socket.id, socket)

  socket.on('disconnect', () => {
    console.log('disconnected')
    connectedPeers.delete(socket.id)
  })

  socket.on('offerOrAnswer', (data) => {
    // send to the other peer(s) if any
    for (const [socketID, socket] of connectedPeers.entries()) {
      // don't send to self
      if (socketID !== data.socketID) {
        console.log(socketID, data.payload.type)
        socket.emit('offerOrAnswer', data.payload)
      }
    }
  })

  socket.on('candidate', (data) => {
    // send candidate to the other peer(s) if any
    for (const [socketID, socket] of connectedPeers.entries()) {
      // don't send to self
      if (socketID !== data.socketID) {
        console.log(socketID, data.payload)
        socket.emit('candidate', data.payload)
      }
    }
  })

  socket.on('stopCall', (data) => {
    // send candidate to the other peer(s) if any
    for (const [socketID, socket] of connectedPeers.entries()) {
      // don't send to self
      if (socketID !== data.socketID) {
        console.log(socketID, data.payload)
        socket.emit('stopCall', data.payload)
      }
    }
  })

})