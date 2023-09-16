import {
  ConversationalRetrievalQAChain,
  RetrievalQAChain,
} from 'langchain/chains'
import { BufferMemory } from 'langchain/memory'

export const conversationalRetrievalChain = ({ llm, retriever }) => {
  return ConversationalRetrievalQAChain.fromLLM(llm ,retriever, {
    memory: new BufferMemory({
      memoryKey: 'chat_history',
    }),
    returnSourceDocuments: true,
    
  })
}

export const retrievalQAchain = ({ llm, retriever, prompt }) => {
  return RetrievalQAChain.fromLLM(llm, retriever, {
    prompt: prompt,
    returnSourceDocuments: true,
  })
}
