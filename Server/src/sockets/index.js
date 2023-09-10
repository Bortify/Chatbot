import { ChatBotInfra } from '../infra/index.js'

const getOnSocketConnection = (io) => (socket) => {
  const { chatId } = socket.handshake.auth
  console.log('user connected with id', chatId)

  const userChannelId = `${chatId}-user`
  const statusChannelId = `${chatId}-status`

  const client = new ChatBotInfra()

  socket.join(userChannelId)
  socket.join(statusChannelId)
  socket.on('message', async (data) => {
    console.warn('bot is thinking.....')

    io.to(statusChannelId).emit('status', {
      status: 'PROCESSING',
      agent: 'SYSTEM',
    })

    const ans = await client.getPredition(data.message)

    io.to(statusChannelId).emit('status', {
      status: 'IDLE',
      agent: 'SYSTEM',
    })

    console.log('bot says: ', ans)
    
    io.to(userChannelId).emit('message', {
      message: ans,
    })
  })
}

export default getOnSocketConnection