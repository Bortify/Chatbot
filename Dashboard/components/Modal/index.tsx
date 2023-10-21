'use client'
import React, { Fragment, ReactNode } from 'react'
import { X } from 'lucide-react'
import { Transition, Dialog } from '@headlessui/react'
import classNames from 'classnames'

type ModalPropsType = {
  active: boolean
  children: ReactNode
  onClose?: () => void
  title?: string
  dialogPanelClassName?: string
  fullWidth?: boolean
  headComponent?: React.JSX.Element
  hideClose?: boolean
}

function Modal({
  active,
  children,
  onClose = () => {},
  title,
  dialogPanelClassName,
  fullWidth,
  headComponent: HeadComponent,
  hideClose,
}: ModalPropsType) {
  return (
    <Transition appear show={active} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div className='fixed inset-0 pointer-events-none backdrop-blur-sm bg-black/20' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex items-center justify-center min-h-full p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'>
              <Dialog.Panel
                className={classNames(
                  'w-full overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg relative p-10',
                  {
                    'max-w-3xl': !fullWidth,
                  },
                  dialogPanelClassName
                )}>
                {HeadComponent}

                {!hideClose && (
                  <X
                    className='absolute w-5 cursor-pointer top-4 right-4'
                    onClick={onClose}
                  />
                )}
                {title && (
                  <Dialog.Title
                    as='h3'
                    className='mb-5 text-xl font-semibold leading-6 text-gray-900'>
                    {title}
                  </Dialog.Title>
                )}
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal
