import { io } from 'socket.io-client'

export function createSocket(
  url: string,
  {
    chatId,
  }: {
    chatId: string
  }
) {
  const socketInit = io(url, {
    auth: {
      chatId: chatId,
    },
    autoConnect: false,
  })

  return socketInit
}
