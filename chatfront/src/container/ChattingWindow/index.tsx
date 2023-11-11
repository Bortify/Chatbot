import Body from '../../components/Body'
import Input from '../../components/Input'
import TopBar from '../../components/TopBar'
import { ChatProp } from '../../hooks/useBot'
import { ChatbotConfiguration } from '../../types/chatbot'

export default function ChattingWindow({
  chat,
  isServerIdle,
  sendMessage,
  loading,
  configuration,
  msgLimitExceeded
}: {
  chat: ChatProp[]
  isServerIdle: boolean
  sendMessage: (message: string) => void
  loading: boolean
  configuration: ChatbotConfiguration
  msgLimitExceeded: boolean
}) {
  return (
    <div className='rounded-xl shadow-lg bg-[#f5f6f8] overflow-hidden w-96 flex flex-col h-[700px]'>
      <TopBar isServerIdle={isServerIdle} configuration={configuration} />
      <Body
        chat={chat}
        isServerIdle={isServerIdle}
        loading={loading}
        configuration={configuration}
      />
      <Input
        sendMessage={sendMessage}
        isServerIdle={isServerIdle}
        configuration={configuration}
        msgLimitExceeded={msgLimitExceeded}
      />
    </div>
  )
}
