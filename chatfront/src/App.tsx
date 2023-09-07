import React from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MessageCircle, X } from 'lucide-react'

import ChattingWindow from './container/ChattingWindow'
import classNames from 'classnames'

function App() {
  return (
    <>
      <Popover className=' fixed right-10 bottom-8'>
        {({ open }) => (
          <>
            <Popover.Button className={'outline-none border-none'}>
              <span className='block w-16 h-16 rounded-full bg-slate-900 shadow-lg relative'>
                <MessageCircle
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
                <ChattingWindow />
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </>
  )
}

export default App
