import { useCallback, useEffect, useRef, useState } from 'react'
import { Socket } from 'socket.io-client'
import { v4 as uuid } from 'uuid'

import { createSocket } from '../sockets'
import { LAST_CHATID_STORAGE_KEY } from '../constants/keys'
import { BACKEND_URL } from '../config'
import { useQuery } from '@tanstack/react-query'
import { getMessages } from '../api/messages'
import { ChatbotConfiguration } from '../types/chatbot'
import { chatDetailsUtil } from '../utils/localStorage'

export interface ChatProp {
  content: string
  author: 'MACHINE' | 'USER'
  timestamp: Date
  id: number
}

interface MessageEventProp {
  message: string
}

interface StatusEventProps {
  status: 'PROCESSING' | 'IDLE'
  agent: 'MACHINE' | 'USER'
}

export default function useBot({ identifier }: { identifier: string }) {
  const chatId = getOrCreateChatId()
  const [socket, setSocket] = useState<Socket>()
  const [chat, setChat] = useState<ChatProp[]>([])
  const [isServerIdle, setIsServerIdle] = useState<boolean>(true)
  const [chatbotEnabled, setChatbotEnabled] = useState<boolean>(false)
  const [chatbotConfiguration, setConfiguration] =
    useState<ChatbotConfiguration | null>(null)
  const messageQuery = useQuery(['messages', chatId], (key) =>
    getMessages(key.queryKey[1], identifier)
  )
  const userMsgCountRef = useRef(0)
  const [msgLimitExceeded, setMsgLimitExceeded] = useState(false)

  useEffect(() => {
    socket?.on('message', (data: MessageEventProp) => {
      const recievedMessage: ChatProp = {
        content: data.message,
        author: 'MACHINE',
        timestamp: new Date(),
        id: Math.random() * 10000000,
      }
      setChat([...chat, recievedMessage])
    })
    socket?.on('connect', () => {
      setChatbotEnabled(true)
    })
    socket?.on('configuration', (data: ChatbotConfiguration) => {
      setConfiguration(data)
    })
  }, [isServerIdle, chat, identifier, chatId, socket])

  useEffect(() => {
    const socketInit = createSocket(BACKEND_URL, {
      chatId: chatId,
      identifier,
    })
    socketInit.connect()
    setSocket(socketInit)
    return () => {
      socketInit.disconnect()
    }
  }, [identifier, chatId])

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

  useEffect(() => {
    if (messageQuery.data?.data) {
      setChat(messageQuery.data.data)
    }
  }, [messageQuery.data])

  function sendMessage(message: string): void {
    socket?.emit('message', {
      message,
    })
    const newChat: ChatProp = {
      content: message,
      author: 'USER',
      timestamp: new Date(),
      id: Math.random() * 100000,
    }
    userMsgCountRef.current += 1
    chatDetailsUtil('UPDATE_COUNT',{
      msgCount: userMsgCountRef.current
    })
    checkMsgLimit()
    setChat([...chat, newChat])
  }

  const checkMsgLimit = useCallback(() => {
    if (chatbotConfiguration) {
      if (userMsgCountRef.current >= chatbotConfiguration.maxUserMsgAllowed) {
        setMsgLimitExceeded(true)
      }
    }
  },[chatbotConfiguration])

  useEffect(() => {
    const savedDetails = chatDetailsUtil('UPSERT')
    if (!savedDetails) return
    const { lastUpdatedAt, msgCount } = savedDetails
    const currentDate = new Date()
    const expiry = new Date(lastUpdatedAt || new Date())
    expiry.setDate(expiry.getDate() + 1)
    if (expiry > currentDate) {
      userMsgCountRef.current = msgCount
      checkMsgLimit()
    } else {
      userMsgCountRef.current = 0
      chatDetailsUtil('SET', {
        msgCount: 0,
        lastUpdatedAt: new Date(),
      })
    }
  }, [chatbotConfiguration,checkMsgLimit])

  return {
    loading: messageQuery.isLoading,
    chat,
    isServerIdle,
    chatbotEnabled,
    sendMessage,
    configuration: chatbotConfiguration,
    msgLimitExceeded,
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
