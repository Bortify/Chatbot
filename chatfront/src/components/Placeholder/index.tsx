import classNames from 'classnames'

function ChatPlaceholder({ author }: { author: 'CLIENT' | 'SERVER' }) {
  return (
    <div className="w-full flex items-center justify-center mt-4 first:mt-0">
      <span
        className={classNames('block px-4 py-3 rounded-2xl max-w-xs', {
          'bg-slate-900 text-white': author === 'SERVER',
          'border-2 border-slate-900 text-slate-900': author === 'CLIENT',
        })}
      >
        <div className="grid gap-2">
          <div className="flex items-center justify-center space-x-2 animate-pulse">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      </span>
      {author === 'SERVER' && <div className="flex flex-1" />}
    </div>
  )
}

export default ChatPlaceholder
