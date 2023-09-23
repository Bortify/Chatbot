import { v1 as uuidV1 } from 'uuid'

import { setDataInCache } from '../cache/index.js'
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
  async ({ chatbot, dataStream, links }) => {
    const CACHING_KEY = `dataStream:website:update-${dataStream.id}`
    const { id } = dataStream
    await setDataInCache(CACHING_KEY, {
      status: 'PROCESSING',
      code: null,
    })
    const siteContent = await Promise.all(links.map((url) => siteLoader(url)))
    const splittedContent = await documentSplitter(
      siteContent.reduce((prev, curr) => {
        prev = [...prev, ...curr]
        return curr
      }, [])
    )
    const index = getChatbotIndex(chatbot.vectorStore.indexName)
    await deleteIndex(index, dataStream.indexIds)
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
        chatbot.id,
        id,
        {
          indexIds: dataToBeEmbedded.map((d) => d.id),
        },
        {
          archived: false,
        }
      )
      await setDataInCache(CACHING_KEY, {
        status: 'SUCCEED',
        code: null,
      })
    } catch (e) {
      await setDataInCache(CACHING_KEY, {
        status: 'ERROR',
        code: DataStreamErrorCode.chatbotNotFound,
      })
    }
  }
)

eventManager.on(
  'dataStream:website:create',
  async ({ dataStream, chatbot }) => {
    const CACHING_KEY = `dataStream:website:create-${dataStream.id}`
    await setDataInCache(CACHING_KEY, {
      status: 'PROCESSING',
      code: null,
    })
    const siteContent = await Promise.all(
      dataStream.data.activeLinks.map((url) => siteLoader(url))
    )
    const splittedContent = await documentSplitter(
      siteContent.reduce((prev, curr) => {
        prev = [...prev, ...curr]
        return curr
      }, [])
    )
    const index = getChatbotIndex(chatbot.vectorStore.indexName)
    const embeddings = await openAIEmbedding.embedDocuments(
      splittedContent.map(({ pageContent }) => pageContent)
    )
    const vectoredForm = embeddings.map((values) => {
      return {
        id: uuidV1(),
        values,
      }
    })
    await insertIndex(index, vectoredForm)
    try {
      dataStream = await updateDataStream(
        chatbot.id,
        dataStream.id,
        {
          indexIds: vectoredForm.map((d) => d.id),
        },
        {
          archived: false,
        }
      )
      await setDataInCache(CACHING_KEY, {
        status: 'SUCCEED',
        code: null,
      })
    } catch (e) {
      await setDataInCache(CACHING_KEY, {
        status: 'ERROR',
        code: DataStreamErrorCode.chatbotNotFound,
      })
    }
  }
)
