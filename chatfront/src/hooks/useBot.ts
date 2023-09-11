import { useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'

import { createSocket } from '../sockets'

export interface ChatProps {
  message: string
  author: 'SERVER' | 'CLIENT'
}

interface MessageEventProp {
  message: string
}

interface StatusEventProps {
  status: 'PROCESSING' | 'IDLE'
  agent: 'SERVER' | 'CLIENT'
}

export default function useBot({ chatId }: { chatId: string }) {
  const [socket, setSocket] = useState<Socket>()
  const [chat, setChat] = useState<ChatProps[]>([])
  const [isServerIdle, setIsServerIdle] = useState<boolean>(true)

  useEffect(() => {
    const socketInit = createSocket('http://localhost:8080', { chatId })
    socketInit.connect()
    setSocket(socketInit)

    socketInit.on('status', (data: StatusEventProps) => {
      if (data.agent === 'SERVER' && data.status === 'PROCESSING') {
        setIsServerIdle(false)
      }
      if (data.agent === 'SERVER' && data.status === 'IDLE') {
        setIsServerIdle(true)
      }
    })

    socketInit.on('message', (data: MessageEventProp) => {
      const recievedMessage: ChatProps = {
        message: data.message,
        author: 'SERVER',
      }
      const newChat = [...chat, recievedMessage]
      setChat(newChat)
    })
    return () => {
      socketInit.disconnect()
    }
  }, [isServerIdle])

  return {
    socket,
    chat,
    setChat,
    isServerIdle,
  }
}
