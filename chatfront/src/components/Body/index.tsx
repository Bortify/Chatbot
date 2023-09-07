import classNames from 'classnames'

export default function Body() {
  return (
    <div className='w-full h-[500px] overflow-y-scroll px-5 py-5'>
      <Message message='Hello' author='system' />
      <Message message='World' author='user' />
      <Message message='World' author='system' />
      <Message
        message='My Name is Hiten lorem ipsum dolor sit fwe wefweg '
        author='user'
      />
    </div>
  )
}

function Message({
  message,
  author,
}: {
  message: string
  author: 'user' | 'system'
}) {
  return (
    <div className='w-full flex items-center justify-center mt-4 first:mt-0'>
      {author === 'user' && <div className='flex flex-1' />}
      <span
        className={classNames('block px-4 py-3 rounded-2xl max-w-xs', {
          'bg-slate-900 text-white': author === 'system',
          'border-2 border-slate-900 text-slate-900': author === 'user',
        })}>
        {message}
      </span>
      {author === 'system' && <div className='flex flex-1' />}
    </div>
  )
}
