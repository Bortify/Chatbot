import React from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MessagesSquare, X } from 'lucide-react'
import classNames from 'classnames'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import ChattingWindow from './container/ChattingWindow'
import useBot from './hooks/useBot'
import { getQueryClient } from './utils/query'
import './index.css'

interface AppProps {
  identifier: string
}

function App({ identifier = 'lol' }: AppProps) {
  const {
    loading,
    chat,
    sendMessage,
    isServerIdle,
    chatbotEnabled,
    configuration,
    msgLimitExceeded
  } = useBot({
    identifier,
  })

  return (
    chatbotEnabled &&
    configuration && (
      <>
        <Popover
          className={`fixed right-10 bottom-8 z-[9999]`}
          style={{
            right: configuration.style.iconPosition.right,
            bottom: configuration.style.iconPosition.bottom,
          }}>
          {({ open }) => (
            <>
              <Popover.Button className={`border-none outline-none`}>
                <span
                  className={`relative block w-16 h-16 rounded-full shadow-lg bg-primary`}
                  style={{
                    backgroundColor: configuration.style.color.icon.background,
                  }}>
                  <MessagesSquare
                    className={classNames(
                      'w-7 h-7 text-white scale-100 ease-in-out duration-300 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2',
                      {
                        'scale-50 opacity-0': open,
                      }
                    )}
                    style={{
                      color: configuration.style.color.icon.text,
                    }}
                  />
                  <X
                    strokeWidth={3}
                    className={classNames(
                      `absolute text-white duration-300 ease-in-out scale-50 -translate-x-1/2 -translate-y-1/2 opacity-0 w-7 h-7 top-1/2 left-1/2`,
                      {
                        'scale-100 opacity-100': open,
                      }
                    )}
                    style={{
                      color: configuration.style.color.icon.text,
                    }}
                  />
                </span>
              </Popover.Button>
              <Transition
                as={React.Fragment}
                enter='transition ease-out duration-200'
                enterFrom='opacity-0 translate-y-5 scale-75'
                enterTo='opacity-100 translate-y-0 scale-100'
                leave='transition ease-in duration-150 scale-100'
                leaveFrom='opacity-100 translate-y-0 scale-75'
                leaveTo='opacity-0 translate-y-5'>
                <Popover.Panel className='relative'>
                  <div className='absolute bottom-0 right-0 -translate-y-24'>
                    <ChattingWindow
                      loading={loading}
                      chat={chat}
                      sendMessage={sendMessage}
                      isServerIdle={isServerIdle}
                      configuration={configuration}
                      msgLimitExceeded = {msgLimitExceeded} 
                    />
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </>
    )
  )
}

const queryClient = getQueryClient()

const Wrapper = ({ identifier }: AppProps) => (
  <QueryClientProvider client={queryClient}>
    <App identifier={identifier} />
    {import.meta.env.DEV && (
      <ReactQueryDevtools initialIsOpen={false} position='bottom-left' />
    )}
  </QueryClientProvider>
)

export default Wrapper
