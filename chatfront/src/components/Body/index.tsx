import classNames from 'classnames'
import React, { useEffect, useRef } from 'react'

import { ChatProps } from '../../hooks/useBot'
import ChatPlaceholder from '../Placeholder'

interface BodyProps {
  chat: ChatProps[]
  isServerIdle: boolean
}

export default function Body({ chat, isServerIdle }: BodyProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight+10000,
        behavior: 'smooth',
      })
    }
  }, [chat])

  return (
    <div className='w-full h-[500px] overflow-y-scroll px-5 py-5' ref={ref}>
      {chat.map((chat, index) => {
        return (
          <Message key={index} message={chat.message} author={chat.author} />
        )
      })}
      {isServerIdle == false && <ChatPlaceholder author='SERVER' />}
      <div className='w-full h-20'/>
      {/* <ChatPlaceholder author="SERVER" /> */}
    </div>
  )
}

function Message({
  message,
  author,
}: {
  message: string
  author: 'CLIENT' | 'SERVER'
}) {
  return (
    <div className='flex items-center justify-center w-full mt-4 first:mt-0'>
      {author === 'CLIENT' && <div className='flex flex-1' />}
      <span
        className={classNames('block px-4 py-3 rounded-2xl max-w-xs', {
          'bg-slate-900 text-white': author === 'SERVER',
          'border-2 border-slate-900 text-slate-900': author === 'CLIENT',
        })}>
        {message}
      </span>
      {author === 'SERVER' && <div className='flex flex-1' />}
    </div>
  )
}
