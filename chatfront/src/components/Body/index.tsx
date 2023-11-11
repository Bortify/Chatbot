import classNames from 'classnames'
import { useEffect, useRef } from 'react'
import Markdown from 'react-markdown'

import { ChatProp } from '../../hooks/useBot'
import ChatPlaceholder from './components/Placeholder'
import { formatDate } from '../../utils/date'
import Spinner from '../Spinner'
import { ChatbotConfiguration } from '../../types/chatbot'

interface BodyProps {
  chat: ChatProp[]
  isServerIdle: boolean
  loading: boolean
  configuration: ChatbotConfiguration
}

export default function Body({
  chat,
  isServerIdle,
  loading,
  configuration,
}: BodyProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight + 10000,
        behavior: 'smooth',
      })
    }
  }, [chat])

  if (loading) {
    return (
      <div className='flex items-center justify-center flex-1'>
        <Spinner className='text-primary fill-[#FEFEFE] w-8 h-8' />
      </div>
    )
  }

  return (
    <div
      className='flex flex-col flex-1 w-full px-5 py-5 overflow-y-auto font-body'
      style={{
        backgroundColor: configuration.style.color.body,
      }}
      ref={ref}>
      {chat.map(({ id, content, timestamp, author }) => {
        return (
          <Message
            key={id}
            message={content}
            author={author}
            timestamp={timestamp}
            color={configuration.style.color.message}
          />
        )
      })}
      {isServerIdle == false && <ChatPlaceholder />}
    </div>
  )
}

function Message({
  message,
  author,
  timestamp,
  color,
}: {
  message: string
  author: 'USER' | 'MACHINE'
  timestamp: Date
  color: ChatbotConfiguration['style']['color']['message']
}) {
  return (
    <div className='flex items-center justify-center w-full mt-4 first:mt-0'>
      {author === 'USER' && <div className='flex flex-1' />}
      <div
        className={classNames(
          'block px-4 pt-3 pb-2 rounded-2xl max-w-xs shadow text-sm'
        )}
        style={{
          backgroundColor:
            author === 'USER'
              ? color.user.background
              : color.machine.background,
          color: author === 'USER' ? color.user.text : color.machine.text,
        }}>
        <Markdown>{message}</Markdown>
        <span
          className={classNames('block w-full mt-1 text-xxs', {
            'text-end': author === 'USER',
            'text-start': author === 'MACHINE',
          })}>
          {formatDate(new Date(timestamp))} ago
        </span>
      </div>
      {author === 'MACHINE' && <div className='flex flex-1' />}
    </div>
  )
}