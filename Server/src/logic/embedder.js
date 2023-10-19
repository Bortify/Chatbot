import OpenAI from './llm.js'

export const textEmbedder = (text) => {
    return OpenAI.embeddings.create({
        input: text,
        model: 'text-embedding-ada-002',
    })
}
