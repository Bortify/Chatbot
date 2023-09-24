import { Router } from 'express'

import chatbotRouter from './chatbot.js'
import authRouter from './auth.js'
import { addUserMiddleware } from '../middleware/auth.js'
import organisationRouter from './organisation.js'
import { attachOrganisationMiddleware } from '../middleware/organisation.js'

const appRouter = Router()

// TODO (HITEN): Create Middleware to attach user and check if request coming for chatbot is valid or not.
appRouter.use('/auth', authRouter)
appRouter.use(
  '/chatbot/:orgId',
  addUserMiddleware,
  attachOrganisationMiddleware,
  chatbotRouter
)
appRouter.use('/organisation', addUserMiddleware, organisationRouter)
export default appRouter
