import { Bot } from 'lucide-react'

import { ChatbotConfiguration } from '@/lib/type/chatbot'

export default function TopBar({
  configuration,
}: {
  configuration: ChatbotConfiguration
}) {
  return (
    <div
      className='flex items-center justify-center gap-5 px-8 py-5'
      style={{
        backgroundColor: configuration.style.color.header.background,
        color: configuration.style.color.header.text,
      }}>
      <Bot
        className='w-7 h-7 text-inherit'
      />
      <div className='flex items-center flex-1'>
        <div>
          <span className='text-base text-inherit'>Bot</span>
          <div className='flex items-center justify-center mt-1'>
            <span className='block w-2 h-2 mr-1 bg-green-500 rounded-full' />
            <span className='text-xxs text-inherit'>
                Online
            </span>
          </div>
        </div>
      </div>
      {/* <MoreVertical className='p-2 duration-300 ease-in-out rounded-full cursor-pointer text-inherit w-9 h-9 hover:bg-white/20' /> */}
    </div>
  )
}
