import {
  ConversationalRetrievalQAChain,
  RetrievalQAChain,
  VectorDBQAChain,
} from 'langchain/chains'
import { BufferMemory } from 'langchain/memory'

export const conversationalRetrievalChain = ({ llm, retriever }) => {
  return ConversationalRetrievalQAChain.fromLLM(llm, retriever, {
    memory: new BufferMemory({
      memoryKey: 'chat_history',
    }),
    returnSourceDocuments: true,
  })
}

export const retrievalQAchain = ({ llm, retriever }) => {
  return RetrievalQAChain.fromLLM(llm, retriever)
}

export const vectorDBQAChain = ({ llm, vectorStore }) => {
  return VectorDBQAChain.fromLLM(llm, vectorStore, {
    k: 2,
  })
}
