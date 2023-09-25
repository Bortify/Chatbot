import { getDataStreamById } from '../models/dataStream.js'

export const attachDataStreamMiddleware = async (req, res, next) => {
  let dataStreamId = null

  try {
    dataStreamId = parseInt(req.params.dataStreamId)
  } catch (e) {
    return res.status(400).json({
      error: 'invalid data stream id',
    })
  }

  const dataStream = await getDataStreamById(req.chatbot.id, dataStreamId, {
    archived: false,
  })

  if (!dataStream) {
    return res.status(404).json({
      error: 'data stream not found',
    })
  }

  req.dataStream = dataStream
  next()
}
