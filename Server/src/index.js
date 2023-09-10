import Express from 'express'
import logger from 'morgan'
import cors from 'cors'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

import { Server as ServerConfig, Environ as EnvironConfig } from './config.js'
import getOnSocketConnection from './sockets/index.js'

const { PORT } = ServerConfig
const { ENVIRONMENT } = EnvironConfig

const app = Express()

if (ENVIRONMENT === 'development') {
  app.use(logger('dev'))
  app.use(cors([]))
}

app.get('/', (req, res) => {
  res.json({
    msg: 'Server Running',
    port: PORT
  })
})

const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: '*',
  },
})

io.on('connection', getOnSocketConnection(io))

server.listen(PORT)
