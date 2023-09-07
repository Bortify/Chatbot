import Express from 'express'
import logger from 'morgan'
import cors from 'cors'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

import { Server as ServerConfig, Environ as EnvironConfig } from './config.js'

const { PORT } = ServerConfig
const { ENVIRONMENT } = EnvironConfig

const app = Express()

if (ENVIRONMENT === 'development') {
  app.use(logger('dev'))
  app.use(cors([]))
}

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/src/sockets/index.html')
})

const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: '*',
  },
})

io.on('connection', (socket) => {
  socket.broadcast.emit('Hello everyone')
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
  socket.on('chat message', (msg) => {
    io.emit('server', msg)
  })
})

server.listen(PORT, () => {
  console.log('server is listening on port ', PORT)
})
