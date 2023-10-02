import React from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MessagesSquare, X } from 'lucide-react'
import classNames from 'classnames'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import ChattingWindow from './container/ChattingWindow'
import useBot from './hooks/useBot'
import { getQueryClient } from './utils/query'

interface AppProps {
  identifier: string
}

function App({ identifier }: AppProps) {
  const { loading, chat, sendMessage, isServerIdle, chatbotEnabled } = useBot({
    identifier,
  })

  return (
    chatbotEnabled && (
      <>
        <Popover className='fixed right-10 bottom-8 z-[9999]'>
          {({ open }) => (
            <>
              <Popover.Button className={'outline-none border-none'}>
                <span className='relative block w-16 h-16 rounded-full shadow-lg bg-primary'>
                  <MessagesSquare
                    className={classNames(
                      'w-7 h-7 text-white scale-100 ease-in-out duration-300 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2',
                      {
                        'scale-50 opacity-0': open,
                      }
                    )}
                  />
                  <X
                    strokeWidth={3}
                    className={classNames(
                      'w-7 h-7 text-white ease-in-out duration-300 scale-50 opacity-0 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2',
                      {
                        'scale-100 opacity-100': open,
                      }
                    )}
                  />
                </span>
              </Popover.Button>
              <Transition
                as={React.Fragment}
                enter='transition ease-out duration-200'
                enterFrom='opacity-0 translate-y-5'
                enterTo='opacity-100 translate-y-0'
                leave='transition ease-in duration-150'
                leaveFrom='opacity-100 translate-y-0'
                leaveTo='opacity-0 translate-y-5'>
                <Popover.Panel className='fixed right-10 bottom-32'>
                  <ChattingWindow
                    loading={loading}
                    chat={chat}
                    sendMessage={sendMessage}
                    isServerIdle={isServerIdle}
                  />
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
