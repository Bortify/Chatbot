import { MoreVertical, Bot} from 'lucide-react'

export default function TopBar({ isServerIdle }: { isServerIdle: boolean }) {
  return (
    <div className="px-8 py-5 bg-primary flex items-center justify-center gap-5">
      <Bot className="w-7 h-7 text-white" />
      <div className="flex flex-1 items-center">
        <div>
          <span className="text-base text-white">Bot</span>
          <div className="flex items-center justify-center mt-1">
            <span className="w-2 h-2 block rounded-full bg-green-500 mr-1" />
            <span className="text-xxs text-white">{isServerIdle ? 'Online' : 'Thinking...'}</span>
          </div>
        </div>
      </div>
      <MoreVertical className="w-9 h-9 text-white hover:bg-white/20 p-2 rounded-full duration-300 ease-in-out cursor-pointer" />
    </div>
  )
}
