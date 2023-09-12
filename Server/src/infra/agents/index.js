import { initializeAgentExecutorWithOptions } from 'langchain/agents'

export const createAgent = ({ llm, tools, config = {} }) => {
  return initializeAgentExecutorWithOptions(tools, llm, {
    agentType: 'chat-conversational-react-description',
    ...config,
  })
}
