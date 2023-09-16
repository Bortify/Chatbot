import { ChainTool } from 'langchain/tools'

import { conversationalRetrievalChain } from '../chains/index.js'

export const productRecommendor = ({ retriever, llm }) =>
  new ChainTool({
    name: 'Product Recommendor',
    description: `Call this function whenever user asks for any recommendations, looking for any particular 
        item or have a query regarding any product.`,
    chain: conversationalRetrievalChain({ llm, retriever }),
  })

export const generalQuestionResolution = ({ retriever, llm }) =>
  new ChainTool({
    name: 'General Question Resolution',
    description: `Call this function when somebody has some general doubt 
                    related to services, privacy policy, terms, vision etc. `,
    chain: conversationalRetrievalChain({ llm, retriever }),
  })
