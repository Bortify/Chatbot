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
    io.to(statusChannelId).emit('status', {
      status: 'PROCESSING',
      agent: 'SERVER',
    })

    try{
      const ans = await client.predict(data.message)
      console.log('bot says',ans)
      io.to(userChannelId).emit('message', {
        message: ans,
      })
    } catch (e){
      console.error(e)
    } finally {
      io.to(statusChannelId).emit('status', {
        status: 'IDLE',
        agent: 'SERVER',
      })
    }
  })
}

export default getOnSocketConnection
