import { MessagesSquare } from 'lucide-react'
import classNames from 'classnames'

import { ChatbotConfiguration } from '@/lib/type/chatbot'

import TopBar from './Chatbot/components/TopBar'
import Body from './Chatbot/components/Body'
import Input from './Chatbot/components/Input'

export default function Preview({
  configuration,
}: {
  configuration: ChatbotConfiguration
}) {
  return (
      <div
        className='absolute flex flex-col items-end justify-end gap-10'
        style={{
          right: configuration.style.iconPosition.right,
          bottom: configuration.style.iconPosition.bottom,
        }}>
        <div className='rounded-xl shadow-lg overflow-hidden w-96 flex flex-col h-[700px]'>
          <TopBar configuration={configuration} />
          <Body configuration={configuration} />
          <Input configuration={configuration} />
        </div>
        <span
          className={`relative block w-16 h-16 rounded-full shadow-lg`}
          style={{
            backgroundColor: configuration.style.color.icon.background
          }}>
          <MessagesSquare
            className={classNames(
              'w-7 h-7 scale-100 ease-in-out duration-300 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-white'
            )}
            style={{
              color: configuration.style.color.icon.background,
            }}
          />
        </span>
      </div>
  )
}
