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
    ListChatBot
} from '../controller/chatbot.js'
import { attachChatbotMiddleware } from '../middleware/chatbot.js'
import { attachDataStreamMiddleware } from '../middleware/knowledgeSource.js'

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
    attachDataStreamMiddleware,
    UpdateKnowledgeSourceInChatbot
)
chatbotRouter.get(
    '/:chatbotId/data/:knowledgeSourceId',
    attachChatbotMiddleware,
    attachDataStreamMiddleware,
    GetKnowledgeSource
)
chatbotRouter.delete(
    '/:chatbotId/data/:knowledgeSourceId',
    attachChatbotMiddleware,
    attachDataStreamMiddleware,
    ArchiveKnowledgeSource
)

// status for data stream jobs.
chatbotRouter.get(
    '/:chatbotId/data/:knowledgeSourceId/status/update',
    attachChatbotMiddleware,
    attachDataStreamMiddleware,
    UpdatingKnowledgeSourceStatusProvider
)
chatbotRouter.get(
    '/:chatbotId/data/:knowledgeSourceId/status/create',
    attachChatbotMiddleware,
    attachDataStreamMiddleware,
    CreatingKnowledgeSourceStatusProvider
)

export default chatbotRouter
