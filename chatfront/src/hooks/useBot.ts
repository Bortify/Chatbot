import { useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'

import { createSocket } from '../sockets'

interface ChatProps {
  message: string
  author: 'AGENT' | 'CLIENT'
}

export default function useBot({ chatId }: { chatId: string }) {
  const [socket, setSocket] = useState<Socket>()
  const [chat, setChat] = useState<ChatProps[]>([])
  useEffect(() => {
    const socketInit = createSocket('http://localhost:8080', { chatId })
    socketInit.connect()
    setSocket(socketInit)
    return () => {
      socketInit.disconnect()
    }
  }, [chatId])

  return {
    socket,
    chat,
    setChat,
  }
}
