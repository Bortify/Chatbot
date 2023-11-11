import classNames from 'classnames'

import { ChatbotConfiguration } from '@/lib/type/chatbot'

interface BodyProps {
  configuration: ChatbotConfiguration
}

export default function Body({ configuration }: BodyProps) {
  return (
    <div
      className='flex flex-col flex-1 w-full px-5 py-5 overflow-y-auto font-body'
      style={{
        backgroundColor: configuration.style.color.body,
      }}>
      <Message
        message={configuration.greetingMessage}
        author={'MACHINE'}
        color={configuration.style.color.message}
      />
      <Message
        message={'See this is Eruva!!'}
        author={'USER'}
        color={configuration.style.color.message}
      />
    </div>
  )
}

function Message({
  message,
  author,
  color,
}: {
  message: string
  author: 'USER' | 'MACHINE'
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
        {message}
        <span
          className={classNames('block w-full mt-1 text-xxs', {
            'text-end': author === 'USER',
            'text-start': author === 'MACHINE',
          })}>
          few secocnds ago
        </span>
      </div>
      {author === 'MACHINE' && <div className='flex flex-1' />}
    </div>
  )
}
