import { v1 as uuidV1 } from 'uuid'

import redisClient, { setDataInCache } from '../cache/index.js'
import { DataStreamErrorCode } from '../constants/errorCodes.js'
import { openAIEmbedding } from '../infra/embedder/index.js'
import { siteLoader } from '../infra/loaders/index.js'
import { findChatbotById } from '../models/chatbot.js'
import {
  deleteIndex,
  getChatbotIndex,
  insertIndex,
} from '../models/pinecone.js'
import { documentSplitter } from '../utils/splitter.js'
import eventManager from './index.js'
import { updateDataStream } from '../models/dataStream.js'

eventManager.on(
  'dataStream:website:update',
  async ({ chatbotId, dataStreamObject, activeLinks }) => {
    const { id } = dataStreamObject
    const siteContent = await Promise.all(
      activeLinks.map((url) => siteLoader(url))
    )
    const chatbot = await findChatbotById(chatbotId)
    if (!chatbot) {
      await setDataInCache(`dataStream-${id}`, {
        status: 'ERROR',
        code: DataStreamErrorCode.chatbotNotFound,
      })
      return null
    }
    const splittedContent = await documentSplitter(
      siteContent.reduce((prev, curr) => {
        prev = [...prev, ...curr]
        return curr
      }, [])
    )
    const index = getChatbotIndex(chatbot.vectorStore.indexName)
    await deleteIndex(index, dataStreamObject.indexIds)
    const embeddings = await openAIEmbedding.embedDocuments(
      splittedContent.map(({ pageContent }) => pageContent)
    )
    const dataToBeEmbedded = embeddings.map((values) => {
      return {
        id: uuidV1(),
        values,
      }
    })
    await insertIndex(index, dataToBeEmbedded)
    try {
      await updateDataStream(
        chatbotId,
        id,
        {
          indexIds: dataToBeEmbedded.map((d) => d.id),
        },
        {
          archived: false,
        }
      )
      await setDataInCache(`dataStream-${id}`, {
        status: 'SUCCEED',
        code: null,
      })
    } catch (e) {
      await setDataInCache(`dataStream-${id}`, {
        status: 'ERROR',
        code: DataStreamErrorCode.chatbotNotFound,
      })
    }
  }
)
