import { DynamicTool } from 'langchain/tools'

import { conversationalRetrievalChain } from '../chains/index.js'

export const productRecommendor = ({ retriever, llm }) =>
  new DynamicTool({
    name: 'Product Recommendor',
    description: `Call this function whenever user asks for any recommendations, looking for any particular 
        item or have a query regarding any product.`,
    func: async (input) => {
      const chain = conversationalRetrievalChain({
        retriever,
        llm,
      })
      const ans = await chain.call({ question: input })
      return ans
    },
  })

export const generalQuestionResolution = ({ retriever, llm }) =>
  new DynamicTool({
    name: 'General Question Resolution',
    description: `Call this function when somebody has some general doubt 
                    related to services, privacy policy, terms, vision etc. `,
    func: async (input) => {
      const chain = conversationalRetrievalChain({
        retriever,
        llm,
      })
      const ans = await chain.call({ question: input })
      return ans
    },
  })
