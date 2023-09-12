import { Send, SmilePlus } from 'lucide-react'
import React, { useRef } from 'react'
import { Socket } from 'socket.io-client'

import { ChatProps } from '../../hooks/useBot'

export default function Input({
  socket,
  util,
  isServerIdle,
}: {
  socket: Socket
  util: {
    chat: ChatProps[]
    setChat: React.Dispatch<React.SetStateAction<ChatProps[]>>
  }
  isServerIdle: boolean
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { chat, setChat } = util

  function sendMessage() {
    if (inputRef.current && inputRef.current.value.length > 0) {
      const message = inputRef.current.value
      socket.emit('message', {
        message,
      })
      const newChat: ChatProps = {
        message: inputRef.current.value,
        author: 'CLIENT',
      }
      const chatArr: ChatProps[] = [...chat, newChat]
      setChat(chatArr)
      inputRef.current.value = ''
      inputRef.current.focus
    }
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className='flex flex-col px-5 bg-white'>
      {!isServerIdle && (
        <span className='block my-2 text-xs text-red-600'>
          You can't send a message while bot is thinking
        </span>
      )}
      <div className='flex items-center justify-center w-full py-1 border-b border-b-gray-500'>
        <input
          ref={inputRef}
          className='flex flex-1 outline-none border-none px-2 py-4 text-[#222] placeholder:text-gray-700 disabled:opacity-75 disabled:cursor-not-allowed'
          placeholder={'Type Your Message'}
          onKeyDown={onKeyDown}
          disabled={!isServerIdle}
        />
        <Send className='text-[#222] w-6 h-6' />
      </div>
      <div className='flex items-center justify-center w-full py-5'>
        <SmilePlus className='w-5 h-5 text-slate-500' />
        <div className='flex flex-1' />
      </div>
    </div>
  )
}
