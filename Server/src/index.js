import Express from 'express'
import logger from 'morgan'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

import { Server as ServerConfig } from './config.js'
import getOnSocketConnection from './sockets/index.js'
import appRouter from './routes/index.js'
import './events/dataStream.js'

const { PORT } = ServerConfig

const app = Express()

app.use(logger('dev'))
app.use(Express.json())
app.use(appRouter)

const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: '*',
  },
})

io.on('connection', getOnSocketConnection(io))

server.listen(PORT)
