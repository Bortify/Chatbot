import { SendHorizonal, SmilePlus } from 'lucide-react'
import React, { useRef } from 'react'
import { Socket } from 'socket.io-client'

import { ChatProps } from '../../hooks/useBot'

export default function Input({
  socket,
  util,
  isServerIdle,
}: {
  socket?: Socket
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
      socket?.emit('message', {
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
    <div className='flex flex-col px-5 bg-white rounded-2xl '>
      {!isServerIdle && (
        <span className='block my-2 text-xs text-red-600'>
          You can't send a message while bot is thinking
        </span>
      )}
      <div className='flex items-center justify-center w-full py-1 '>
        <input
          ref={inputRef}
          className='flex flex-1 px-2 py-4 bg-transparent border-none outline-none text-black/80 placeholder:text-black/80 disabled:opacity-75 disabled:cursor-not-allowed placeholder:text-slate-400'
          placeholder={'Type Your Message'}
          onKeyDown={onKeyDown}
          disabled={!isServerIdle}
        />
        <button className='p-2 rounded-full bg-primary aspect-square'>
          <SendHorizonal className='text-[#f5f6f8]/60  translate-x-[2px] w-6 h-auto ' />
        </button>
      </div>
      <hr className='w-full mt-2 h-0.5 border rounded-xl border-gray-800/20' />
      <div className='flex items-center justify-center w-full py-5'>
        <SmilePlus className='w-5 h-5 text-black/60' />
        <div className='flex flex-1' />
        <span className='text-[10px] text-black/60'>
          Powered by{' '}
          <span className='text-sm font-bold font-logo'>IndieBot</span>
        </span>
      </div>
    </div>
  )
}
