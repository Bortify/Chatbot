import classNames from 'classnames'
import { useEffect, useRef } from 'react'

import { ChatProps } from '../../hooks/useBot'
import ChatPlaceholder from './components/Placeholder'
import { formatDate } from '../../utils/date'

interface BodyProps {
  chat: ChatProps[]
  isServerIdle: boolean
}

export default function Body({ chat, isServerIdle }: BodyProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight + 10000,
        behavior: 'smooth',
      })
    }
  }, [chat])

  return (
    <div
      className='flex flex-col flex-1 w-full px-5 py-5 overflow-y-auto font-body'
      ref={ref}>
      {chat.map(({ id, content, timestamp, author }) => {
        return (
          <Message
            key={id}
            message={content}
            author={author}
            timestamp={timestamp}
          />
        )
      })}
      {isServerIdle == false && <ChatPlaceholder />}
      {/* <div className='w-full h-20'/> */}
    </div>
  )
}

function Message({
  message,
  author,
  timestamp,
}: {
  message: string
  author: 'USER' | 'MACHINE'
  timestamp: Date
}) {
  return (
    <div className='flex items-center justify-center w-full mt-4 first:mt-0'>
      {author === 'USER' && <div className='flex flex-1' />}
      <div
        className={classNames(
          'block px-4 pt-3 pb-2 rounded-2xl max-w-xs shadow text-sm',
          {
            'bg-white text-secondary': author === 'MACHINE',
            'border-2 bg-secondary  text-white': author === 'USER',
          }
        )}>
        {message}
        <span
          className={classNames('block w-full mt-1 text-xxs', {
            ' text-end': author === 'USER',
            'text-start': author === 'MACHINE',
          })}>
          {formatDate(new Date(timestamp))} ago
        </span>
      </div>
      {author === 'MACHINE' && <div className='flex flex-1' />}
    </div>
  )
}
