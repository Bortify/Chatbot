import { v1 as uuidV1 } from 'uuid'

import { setDataInCache } from '../cache/index.js'
import { DataStreamErrorCode } from '../constants/errorCodes.js'
import { textEmbedder } from '../infra/embedder.js'
import { siteLoader } from '../utils/loader.js'
import { deleteIndex, insertIndex } from '../models/pinecone.js'
import { textSplitter } from '../utils/splitter.js'
import eventManager from './index.js'
import { updateDataStream } from '../models/dataStream.js'

eventManager.on(
  'dataStream:website:update',
  async ({ chatbot, dataStream }) => {
    const CACHING_KEY = `dataStream:website:update-${dataStream.id}`
    const { id } = dataStream
    await setDataInCache(CACHING_KEY, {
      status: 'PROCESSING',
      code: null,
    })
    await deleteIndex(chatbot.knowledgeBase.indexName, dataStream.indexIds)
    const siteContent = await Promise.all(
      dataStream.data.activeLinks.map((url) => siteLoader(url))
    )
    const chunks = textSplitter(siteContent.join(' '), {
      maximumChunkSize: 20,
    })
    const embeddings = await Promise.all(
      chunks.map((text) => textEmbedder(text))
    )
    let idx = 0
    const vectoredForm = embeddings.map((embedding) => {
      return {
        id: uuidV1(),
        values: embedding.data[0].embedding,
        metadata: {
          context: chunks[idx++],
        },
      }
    })
    await insertIndex(chatbot.knowledgeBase.indexName, vectoredForm)
    try {
      await updateDataStream(
        chatbot.id,
        id,
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
    const chunks = textSplitter(siteContent.join(' '), {
      maximumChunkSize: 20,
    })
    const embeddings = await Promise.all(
      chunks.map((text) => textEmbedder(text))
    )
    let idx = 0
    const vectoredForm = embeddings.map((embedding) => {
      return {
        id: uuidV1(),
        values: embedding.data[0].embedding,
        metadata: {
          context: chunks[idx++],
        },
      }
    })
    await insertIndex(chatbot.knowledgeBase.indexName, vectoredForm)
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
