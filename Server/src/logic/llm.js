import OpenAi from 'openai'
import { OpenAI as OpenAIConfig } from '../config.js'

const OpenAI = new OpenAi({
    apiKey: OpenAIConfig.API_KEY,
})

export default OpenAI
