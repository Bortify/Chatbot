import { Router } from 'express'

import {
    AddKnowledgeToChatbot,
    CreateChatBot,
    UpdateChatbot,
    GetChatbotDetails,
    UpdateKnowledgeSourceInChatbot,
    GetKnowledgeSource,
    ArchiveChatbot,
    ArchiveKnowledgeSource,
    UpdatingKnowledgeSourceStatusProvider,
    CreatingKnowledgeSourceStatusProvider,
    ListChatBot,
} from '../controller/chatbot.js'
import { attachChatbotMiddleware } from '../middleware/chatbot.js'
import { attachKnowloedgeSource } from '../middleware/knowledgeSource.js'

const chatbotRouter = Router()

chatbotRouter.post('/', CreateChatBot)
chatbotRouter.get('/', ListChatBot)
chatbotRouter.put('/:chatbotId', attachChatbotMiddleware, UpdateChatbot)
chatbotRouter.get('/:chatbotId', attachChatbotMiddleware, GetChatbotDetails)
chatbotRouter.delete('/:chatbotId', attachChatbotMiddleware, ArchiveChatbot)

chatbotRouter.post(
    '/:chatbotId/data',
    attachChatbotMiddleware,
    AddKnowledgeToChatbot
)
chatbotRouter.put(
    '/:chatbotId/data/:knowledgeSourceId',
    attachChatbotMiddleware,
    attachKnowloedgeSource,
    UpdateKnowledgeSourceInChatbot
)
chatbotRouter.get(
    '/:chatbotId/data/:knowledgeSourceId',
    attachChatbotMiddleware,
    attachKnowloedgeSource,
    GetKnowledgeSource
)
chatbotRouter.delete(
    '/:chatbotId/data/:knowledgeSourceId',
    attachChatbotMiddleware,
    attachKnowloedgeSource,
    ArchiveKnowledgeSource
)

// status for data stream jobs.
chatbotRouter.get(
    '/:chatbotId/data/:knowledgeSourceId/status/update',
    attachChatbotMiddleware,
    attachKnowloedgeSource,
    UpdatingKnowledgeSourceStatusProvider
)
chatbotRouter.get(
    '/:chatbotId/data/:knowledgeSourceId/status/create',
    attachChatbotMiddleware,
    attachKnowloedgeSource,
    CreatingKnowledgeSourceStatusProvider
)

export default chatbotRouter
