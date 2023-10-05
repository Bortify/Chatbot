import Express from 'express'
import logger from 'morgan'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import { Server as ServerConfig } from './config.js'
import getOnSocketConnection from './sockets/index.js'
import appRouter from './routes/index.js'
import './events/knowledgeSource.js'
import { attachChatBotMiddleware } from './middleware/socket.js'
import { BACKEND_URL } from './constants/urls.js'

const { PORT } = ServerConfig

const app = Express()

app.use(
  cors()
)
app.use(logger('dev'))
app.use(Express.json())
app.use(cookieParser())
app.use(appRouter)

// Self pinging for render only.
app.get('/',(req,res)=>{
  return res.json({
    message: 'ok'
  })
})

setInterval(async ()=>{
  await fetch(BACKEND_URL)
},10000)

const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: '*',
  },
})

io.use(attachChatBotMiddleware)
io.on('connection', getOnSocketConnection(io))

server.listen(PORT)
