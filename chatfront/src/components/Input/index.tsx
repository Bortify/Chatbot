import { Send, SmilePlus } from 'lucide-react'
import React, { useRef } from 'react'
import { Socket } from 'socket.io-client'

export default function Input({ socket }: { socket: Socket }) {
  const inputRef = useRef<HTMLInputElement>(null)

  function sendMessage() {
    if (inputRef.current && inputRef.current.value.length > 0) {
      const message = inputRef.current.value
      socket.emit('message', {
        message,
      })
      inputRef.current.value = ''
      inputRef.current.focus
    }
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>){
    if(event.key === 'Enter'){
      event.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className='flex flex-col px-5 bg-white'>
      <div className='flex items-center justify-center w-full py-1 border-b border-b-gray-500'>
        <input
          ref={inputRef}
          className='flex flex-1 outline-none border-none px-2 py-4 text-[#222] placeholder:text-gray-700'
          placeholder='Type Your Message'
          onKeyDown={onKeyDown}
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
