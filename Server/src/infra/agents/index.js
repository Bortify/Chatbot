import { initializeAgentExecutorWithOptions } from 'langchain/agents'

export const createAgent = ({ llm, tools, config = {} }) => {
  return initializeAgentExecutorWithOptions(tools, llm, {
    agentType: 'structured-chat-zero-shot-react-description',
    maxIterations: 1,
    returnIntermediateSteps: true,
    earlyStoppingMethod: 'force',
    ...config,
  })
}
