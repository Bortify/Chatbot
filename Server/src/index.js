import Express from 'express'
import logger from 'morgan'
import cors from 'cors'

import { Server as ServerConfig, Environ as EnvironConfig } from './config.js'

const { PORT } = ServerConfig
const {ENVIRONMENT} = EnvironConfig

const app = Express()

if(ENVIRONMENT === 'development'){
    app.use(logger('dev'))
    app.use(cors([]))
}

app.get('/', (req, res) => {
  res.json({
    message: 'Server working',
  })
})

app.listen(PORT, () => {
  console.log('server is listening on port ', PORT)
})
