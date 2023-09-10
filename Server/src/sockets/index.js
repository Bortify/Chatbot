const getOnSocketConnection = (io) => (socket) => {
  const { chatId } = socket.handshake.auth

  const userChannelId = `${chatId}-user`
  const statusChannelId = `${chatId}-status`

  console.log('user connected with id',chatId)

  socket.join(userChannelId)
  socket.join(statusChannelId)
  socket.on('message', (data) => {
    console.log(chatId,':',data.message)
  })
}

const STATUS = {
  typing: 'TYPING',
  idle: 'IDLE',
}

export default getOnSocketConnection