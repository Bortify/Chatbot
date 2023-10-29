import { v1 as uuidV1 } from 'uuid'

import { setDataInCache } from '../cache/index.js'
import { DataStreamErrorCode } from '../constants/errorCodes.js'
import { textEmbedder } from '../logic/embedder.js'
import { siteLoader } from '../utils/loader.js'
import { deleteIndex, insertIndex } from '../models/pinecone.js'
import { textSplitter } from '../utils/splitter.js'
import eventManager from './index.js'
import { updateKnowledgeSource } from '../models/knowledgeSource.js'

eventManager.on(
    'knowledgeSource:website:create',
    async ({ knowledgeSource, chatbot }) => {
    const CACHING_KEY = `knowledgeSource-${knowledgeSource.id}`
    await setDataInCache(CACHING_KEY, {
        status: 'PROCESSING',
        code: null,
    })
    const siteContent = await Promise.all(
        knowledgeSource.data.activeLinks.map((url) => siteLoader(url))
    )
    const chunks = textSplitter(siteContent.join(' '))
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
        await updateKnowledgeSource(
            chatbot.knowledgeBase.id,
            knowledgeSource.id,
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
        console.log('ERROR from CREATE knowledge Source: ', e)
        await setDataInCache(CACHING_KEY, {
            status: 'ERROR',
            code: DataStreamErrorCode.chatbotNotFound,
        })
    }
})

eventManager.on(
    'knowledgeSource:website:update',
    async ({ chatbot, knowledgeSource }) => {
    const CACHING_KEY = `knowledgeSource-${knowledgeSource.id}`
    await setDataInCache(CACHING_KEY, {
        status: 'PROCESSING',
        code: null,
    })
    await deleteIndex(chatbot.knowledgeBase.indexName, knowledgeSource.indexIds)
    const siteContent = await Promise.all(
        knowledgeSource.data.activeLinks.map((url) => siteLoader(url))
    )
    const chunks = textSplitter(siteContent.join(' '))
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
        await updateKnowledgeSource(
            chatbot.knowledgeBase.id,
            knowledgeSource.id,
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
        console.log('ERROR from CREATE knowledge Source: ', e)
        await setDataInCache(CACHING_KEY, {
            status: 'ERROR',
            code: DataStreamErrorCode.chatbotNotFound,
        })
    }
})
