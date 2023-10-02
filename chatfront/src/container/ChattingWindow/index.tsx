import Body from '../../components/Body'
import Input from '../../components/Input'
import TopBar from '../../components/TopBar'
import { ChatProp } from '../../hooks/useBot'

export default function ChattingWindow({
  chat,
  isServerIdle,
  sendMessage,
  loading
}: {
  chat: ChatProp[]
  isServerIdle: boolean
  sendMessage: (message: string) => void
  loading: boolean
}) {
  return (
    <div className='rounded-xl shadow-lg bg-[#f5f6f8] overflow-hidden w-96 flex flex-col h-[700px]'>
      <TopBar isServerIdle={isServerIdle} />
      <Body chat={chat} isServerIdle={isServerIdle} loading={loading}/>
      <Input sendMessage={sendMessage} isServerIdle={isServerIdle} />
    </div>
  )
}
