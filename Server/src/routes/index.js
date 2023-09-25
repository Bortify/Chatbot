import { Router } from 'express'

import chatbotRouter from './chatbot.js'
import authRouter from './auth.js'
import { addUserMiddleware } from '../middleware/auth.js'
import organisationRouter from './organisation.js'
import { attachOrganisationMiddleware } from '../middleware/organisation.js'

const appRouter = Router()

appRouter.use('/auth', authRouter)
appRouter.use('/organisation', addUserMiddleware, organisationRouter)
appRouter.use(
  '/organisation/:orgId/chatbot',
  addUserMiddleware,
  attachOrganisationMiddleware,
  chatbotRouter
)
export default appRouter
