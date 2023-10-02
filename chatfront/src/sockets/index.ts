import { io } from 'socket.io-client'

export function createSocket(
  url: string,
  {
    chatId,
    identifier,
  }: {
    chatId: string
    identifier: string
  }
) {
  const socketInit = io(url, {
    auth: {
      chatId,
      identifier,
    },
    autoConnect: false,
  })
  return socketInit
}
