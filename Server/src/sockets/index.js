import { ChatBotInfra } from '../infra/index.js'

const client = new ChatBotInfra()

const getOnSocketConnection = (io) => (socket) => {
  const { chatId } = socket.handshake.auth
  console.log('user connected with id', chatId)

  const userChannelId = `${chatId}-user`
  const statusChannelId = `${chatId}-status`


  socket.join(userChannelId)
  socket.join(statusChannelId)
  socket.on('message', async (data) => {
    io.to(statusChannelId).emit('status', {
      status: 'PROCESSING',
      agent: 'SERVER',
    })

    const ans = await client.getPredition(data.message)
    console.log('bot says',ans)
    io.to(statusChannelId).emit('status', {
      status: 'IDLE',
      agent: 'SERVER',
    })

    io.to(userChannelId).emit('message', {
      message: ans,
    })
  })
}

export default getOnSocketConnection
