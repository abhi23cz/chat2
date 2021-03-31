const express = require('express')
const app = express()
const http = require('http').createServer(app)

http.listen(80, () =>{
  console.log("Listening on port 80")
})


app.use(express.static('public'))

app.get('/', (req,res) =>{
  res.sendFile(__dirname + '/index.html')
})

const io = require('socket.io')(http)

io.on('connection', (socket) =>{
  console.log("Connected.")

  socket.on('user-joined', (name) =>{
    socket.broadcast.emit('user-joined', name)
  })
  socket.on('message', (msg) =>{
    socket.broadcast.emit('message' ,msg)
  })


})
