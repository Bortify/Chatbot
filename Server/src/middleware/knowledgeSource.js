import { getKnowledgeSourceById } from '../models/knowledgeSource.js'

export const attachDataStreamMiddleware = async (req, res, next) => {
  let knowledgeSourceId = null

  try {
    knowledgeSourceId = parseInt(req.params.knowledgeSourceId)
  } catch (e) {
    return res.status(400).json({
      error: 'invalid data stream id',
    })
  }

  const knowledgeSource = await getKnowledgeSourceById(
    req.chatbot.knowledgeBase.id,
    knowledgeSourceId,
    {
      archived: false,
    }
  )

  if (!knowledgeSource) {
    return res.status(404).json({
      error: 'knowledge source not found',
    })
  }

  req.knowledgeSource = knowledgeSource
  next()
}
