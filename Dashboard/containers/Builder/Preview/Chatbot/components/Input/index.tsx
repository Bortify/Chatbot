import React from 'react'

import { ChatbotConfiguration } from '@/lib/type/chatbot'
import { SendHorizonal } from 'lucide-react'

export default function Input({
  configuration,
}: {
  configuration: ChatbotConfiguration
}) {
  return (
    <div
      className='flex flex-col px-5 rounded-2xl '
      style={{
        backgroundColor: configuration.style.color.typingArea.background,
      }}>
      {
        <span
          className='block my-2 text-xs'
          style={{
            color: configuration.style.color.thinkingContainer.text,
          }}>
          {configuration.thinkingText}
        </span>
      }
      {
        <span
          className='block my-2 text-xs'
          style={{
            color: configuration.style.color.thinkingContainer.text,
          }}>
          {configuration.limitExceedText}
        </span>
      }
      <div
        className='flex items-center justify-center w-full py-1'
        style={{
          color: configuration.style.color.typingArea.text,
        }}>
        <input
          className='flex flex-1 px-2 py-4 bg-transparent border-none outline-none text-inherit disabled:opacity-75 disabled:cursor-not-allowed placeholder:text-slate-400'
          placeholder={configuration.placeholder}
        />
        <button
          className='p-2 rounded-full aspect-square'
          style={{
            backgroundColor: configuration.style.color.sendButton.background,
            color: configuration.style.color.sendButton.text,
          }}>
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
