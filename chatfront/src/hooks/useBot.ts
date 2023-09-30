import { useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'
import { v4 as uuid } from 'uuid'

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

export default function useBot({ identifier }: { identifier: string }) {
  const [socket, setSocket] = useState<Socket>()
  const [chat, setChat] = useState<ChatProps[]>([])
  const [isServerIdle, setIsServerIdle] = useState<boolean>(true)

  useEffect(() => {
    const socketInit = createSocket('http://localhost:8080', {
      chatId: getOrCreateChatId(),
      identifier,
    })
    socketInit.connect()
    setSocket(socketInit)
    socketInit.on('message', (data: MessageEventProp) => {
      const recievedMessage: ChatProps = {
        message: data.message,
        author: 'SERVER',
      }
      const newChat = [...chat, recievedMessage]
      setChat(newChat)
    })
  }, [isServerIdle, chat, identifier])

  useEffect(() => {
    socket?.on('status', (data: StatusEventProps) => {
      if (data.agent === 'SERVER' && data.status === 'PROCESSING') {
        setIsServerIdle(false)
      }
      if (data.agent === 'SERVER' && data.status === 'IDLE') {
        setIsServerIdle(true)
      }
    })
  }, [isServerIdle, socket])

  return {
    socket,
    chat,
    setChat,
    isServerIdle,
  }
}

function getOrCreateChatId(): string {
  const key = '__INDIEBOT_CHAT_ID__'
  const chatId = localStorage.getItem(key)
  if (chatId) {
    return chatId
  } else {
    const id: string = uuid()
    localStorage.setItem(key, id)
    return id
  }
}
