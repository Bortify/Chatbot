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
  WebsiteStatusProvider
} from '../controller/dashboard.js'

const chatbotRouter = Router()

chatbotRouter.post('/', CreateChatBot)
chatbotRouter.put('/:chatbotId', UpdateChatbot)
chatbotRouter.get('/:chatbotId', GetChatbotDetails)
chatbotRouter.delete('/:chatbotId', ArchiveChatbot)

chatbotRouter.post('/:chatbotId/website', AddWebsiteToChatbot)
chatbotRouter.put('/:chatbotId/website/:websiteId', UpdateWebsite)
chatbotRouter.get('/:chatbotId/website/:websiteId', GetWebsite)
chatbotRouter.delete('/:chatbotId/website/:websiteId', ArchiveWebsite)
chatbotRouter.get('/:chatbotId/website/:websiteId/status', WebsiteStatusProvider)

export default chatbotRouter
