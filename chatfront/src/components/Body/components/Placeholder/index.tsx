import classNames from 'classnames'

function ChatPlaceholder() {
  return (
    <div className='flex items-center justify-center w-full mt-4 first:mt-0'>
      <span
        className={classNames(
          'block px-4 py-3 rounded-2xl max-w-xs',
          'bg-gray-200'
        )}>
        <div className='grid gap-2'>
          <div className='flex items-center justify-center space-x-2 animate-bounce'>
            <div className='w-2 h-2 bg-gray-300 rounded-full'></div>
            <div className='w-2 h-2 bg-gray-300 rounded-full'></div>
            <div className='w-2 h-2 bg-gray-300 rounded-full'></div>
          </div>
        </div>
      </span>
      <div className='flex flex-1' />
    </div>
  )
}

export default ChatPlaceholder
