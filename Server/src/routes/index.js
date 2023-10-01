import { Router } from 'express'

import chatbotRouter from './chatbot.js'
import authRouter from './auth.js'
import {
  addUserMiddleware,
  checkForEmailVerfification,
} from '../middleware/auth.js'
import organisationRouter from './organisation.js'
import { attachOrganisationMiddleware } from '../middleware/organisation.js'
import messageRouter from './messages.js'
import { attachConversationMiddleware } from '../middleware/conversation.js'

const appRouter = Router()

appRouter.use('/auth', authRouter)
appRouter.use(
  '/organisation',
  addUserMiddleware,
  checkForEmailVerfification,
  organisationRouter
)
appRouter.use(
  '/organisation/:orgId/chatbot',
  addUserMiddleware,
  attachOrganisationMiddleware,
  checkForEmailVerfification,
  chatbotRouter
)
appRouter.use(
  '/conversation/:conversationId',
  attachConversationMiddleware,
  messageRouter
)
export default appRouter
