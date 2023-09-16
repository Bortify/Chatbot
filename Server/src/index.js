import Express from 'express'
import logger from 'morgan'
import fs from 'fs'
import url from 'url'
import path from 'path'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

import { Server as ServerConfig, Environ as EnvironConfig } from './config.js'
import getOnSocketConnection from './sockets/index.js'

const { PORT } = ServerConfig
const { ENVIRONMENT } = EnvironConfig
const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
)

const app = Express()

if (ENVIRONMENT === 'development') {
  app.use(logger('combined', { stream: accessLogStream }))
}

const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: '*',
  },
})

io.on('connection', getOnSocketConnection(io))

server.listen(PORT)
