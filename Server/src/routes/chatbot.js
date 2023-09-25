import { Router } from 'express'

import {
  AddDataStreamToChatbot,
  CreateChatBot,
  UpdateChatbot,
  GetChatbotDetails,
  UpdateDataStream,
  GetDataStream,
  ArchiveChatbot,
  ArchiveDataStream,
  UpdatingDataStreamStatusProvider,
  CreatingDataStreamStatusProvider,
} from '../controller/chatbot.js'
import { attachChatbotMiddleware } from '../middleware/chatbot.js'
import { attachDataStreamMiddleware } from '../middleware/dataStream.js'

const chatbotRouter = Router()

chatbotRouter.post('/', CreateChatBot)
chatbotRouter.put('/:chatbotId', attachChatbotMiddleware, UpdateChatbot)
chatbotRouter.get('/:chatbotId', attachChatbotMiddleware, GetChatbotDetails)
chatbotRouter.delete('/:chatbotId', attachChatbotMiddleware, ArchiveChatbot)

chatbotRouter.post(
  '/:chatbotId/data',
  attachChatbotMiddleware,
  AddDataStreamToChatbot
)
chatbotRouter.put(
  '/:chatbotId/data/:dataStreamId',
  attachChatbotMiddleware,
  attachDataStreamMiddleware,
  UpdateDataStream
)
chatbotRouter.get(
  '/:chatbotId/data/:dataStreamId',
  attachChatbotMiddleware,
  attachDataStreamMiddleware,
  GetDataStream
)
chatbotRouter.delete(
  '/:chatbotId/data/:dataStreamId',
  attachChatbotMiddleware,
  attachDataStreamMiddleware,
  ArchiveDataStream
)

// status for data stream jobs.
chatbotRouter.get(
  '/:chatbotId/data/:dataStreamId/status/update',
  attachChatbotMiddleware,
  attachDataStreamMiddleware,
  UpdatingDataStreamStatusProvider
)
chatbotRouter.get(
  '/:chatbotId/data/:dataStreamId/status/create',
  attachChatbotMiddleware,
  attachDataStreamMiddleware,
  CreatingDataStreamStatusProvider
)

export default chatbotRouter
