import { Router } from 'express'

import {
  AddWebsiteToChatbot,
  CreateChatBot,
  UpdateChatbot,
  GetChatbotDetails,
  UpdateWebsite,
  GetWebsite,
  ArchiveChatbot,
  ArchiveWebsite,
  UpdatingWebsiteStatusProvider,
  CreatingWebsiteStatusProvider,
} from '../controller/chatbot.js'
import { attachChatbotMiddleware } from '../middleware/chatbot.js'

const chatbotRouter = Router()

chatbotRouter.post('/', CreateChatBot)
chatbotRouter.put('/:chatbotId', attachChatbotMiddleware, UpdateChatbot)
chatbotRouter.get('/:chatbotId', attachChatbotMiddleware, GetChatbotDetails)
chatbotRouter.delete('/:chatbotId', attachChatbotMiddleware, ArchiveChatbot)

chatbotRouter.post(
  '/:chatbotId/website',
  attachChatbotMiddleware,
  AddWebsiteToChatbot
)
chatbotRouter.put(
  '/:chatbotId/website/:websiteId',
  attachChatbotMiddleware,
  UpdateWebsite
)
chatbotRouter.get(
  '/:chatbotId/website/:websiteId',
  attachChatbotMiddleware,
  GetWebsite
)
chatbotRouter.delete(
  '/:chatbotId/website/:websiteId',
  attachChatbotMiddleware,
  ArchiveWebsite
)

chatbotRouter.get(
  '/:chatbotId/website/:websiteId/status/update',
  attachChatbotMiddleware,
  UpdatingWebsiteStatusProvider
)
chatbotRouter.get(
  '/:chatbotId/website/:websiteId/status/create',
  attachChatbotMiddleware,
  CreatingWebsiteStatusProvider
)

export default chatbotRouter
