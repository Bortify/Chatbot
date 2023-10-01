import { useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'
import { v4 as uuid } from 'uuid'

import { createSocket } from '../sockets'
import { LAST_CHATID_STORAGE_KEY } from '../constants/keys'
import { BACKEND_URL } from '../config'
import { useQuery } from '@tanstack/react-query'
import { getMessages } from '../api/messages'

export interface ChatProps {
  content: string
  author: 'MACHINE' | 'USER'
  timestamp: Date
  id: number
}

interface StatusEventProps {
  status: 'PROCESSING' | 'IDLE'
  agent: 'MACHINE' | 'USER'
}

export default function useBot({ identifier }: { identifier: string }) {
  const chatId = getOrCreateChatId()
  const [socket, setSocket] = useState<Socket>()
  const [chat, setChat] = useState<ChatProps[]>([])
  const [isServerIdle, setIsServerIdle] = useState<boolean>(true)
  const [chatbotEnabled, setChatbotEnabled] = useState<boolean>(false)
  const messageQuery = useQuery(['messages', chatId], (key) =>
    getMessages(key.queryKey[1])
  )

  useEffect(() => {
    const socketInit = createSocket(BACKEND_URL, {
      chatId: chatId,
      identifier,
    })
    socketInit.connect()
    setSocket(socketInit)
    socketInit.on('message', () => {
      // invalidate chats
    })
    socketInit.on('connect', () => {
      setChatbotEnabled(true)
    })
  }, [isServerIdle, chat, identifier, chatId])

  useEffect(() => {
    socket?.on('status', (data: StatusEventProps) => {
      if (data.agent === 'MACHINE' && data.status === 'PROCESSING') {
        setIsServerIdle(false)
      }
      if (data.agent === 'MACHINE' && data.status === 'IDLE') {
        setIsServerIdle(true)
      }
    })
  }, [isServerIdle, socket])

  return {
    socket,
    chat: messageQuery.data?.data || [],
    setChat,
    isServerIdle,
    chatbotEnabled,
  }
}

function getOrCreateChatId(): string {
  const chatId = localStorage.getItem(LAST_CHATID_STORAGE_KEY)
  if (chatId) {
    return chatId
  } else {
    const id: string = uuid()
    localStorage.setItem(LAST_CHATID_STORAGE_KEY, id)
    return id
  }
}
