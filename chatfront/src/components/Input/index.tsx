import { SendHorizonal } from 'lucide-react'
import React, { useEffect, useRef } from 'react'

import { ChatbotConfiguration } from '../../types/chatbot'

export default function Input({
  isServerIdle,
  sendMessage,
  configuration,
  msgLimitExceeded,
}: {
  isServerIdle: boolean
  sendMessage: (message: string) => void
  configuration: ChatbotConfiguration
  msgLimitExceeded: boolean
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const disabled = !isServerIdle || msgLimitExceeded

  function sendMessageHandler() {
    if (inputRef.current && inputRef.current.value.length > 0) {
      const message = inputRef.current.value
      sendMessage(message)
      inputRef.current.value = ''
    }
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      event.preventDefault()
      sendMessageHandler()
    }
  }

  useEffect(() => {
    if (isServerIdle) {
      inputRef.current?.focus()
    }
  }, [isServerIdle])

  return (
    <div
      className='flex flex-col px-5 rounded-2xl '
      style={{
        backgroundColor: configuration.style.color.typingArea.background,
      }}>
      {!isServerIdle && (
        <span
          className='block my-2 text-xs'
          style={{
            color: configuration.style.color.thinkingContainer.text,
          }}>
          {configuration.thinkingText}
        </span>
      )}
      {msgLimitExceeded && isServerIdle && (
        <span
          className='block my-2 text-xs'
          style={{
            color: configuration.style.color.thinkingContainer.text,
          }}>
          {configuration.limitExceedText}
        </span>
      )}
      <div
        className='flex items-center justify-center w-full py-1'
        style={{
          color: configuration.style.color.typingArea.text,
        }}>
        <input
          ref={inputRef}
          className='flex flex-1 px-2 py-4 bg-transparent border-none outline-none text-inherit disabled:opacity-75 disabled:cursor-not-allowed placeholder:text-slate-400'
          placeholder={'Type Your Message'}
          onKeyDown={onKeyDown}
          disabled={disabled}
        />
        <button
          className='p-2 rounded-full aspect-square'
          style={{
            backgroundColor: configuration.style.color.icon.background,
            color: configuration.style.color.icon.text,
          }}
          disabled={disabled}
          onClick={sendMessageHandler}>
          <SendHorizonal className='text-inherit translate-x-[2px] w-6 h-auto ' />
        </button>
      </div>
      <hr className='w-full mt-2 h-0.5 border rounded-xl border-gray-800/20' />
      <div className='flex items-center justify-center w-full py-5'>
        {/* <SmilePlus className='w-5 h-5 text-black/60' /> */}
        <div className='flex flex-1' />
        <span className='text-[10px] text-black/60'>
          Powered by <span className='text-sm font-bold font-logo'>Eruva</span>
        </span>
      </div>
    </div>
  )
}
