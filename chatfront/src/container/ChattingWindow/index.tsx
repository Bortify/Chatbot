import { Socket } from 'socket.io-client'

import Body from '../../components/Body'
import Input from '../../components/Input'
import TopBar from '../../components/TopBar'
import { ChatProps } from '../../hooks/useBot'


export default function ChattingWindow({ socket, chat, isServerIdle }: { socket?: Socket, chat: ChatProps[], setChat: React.Dispatch<React.SetStateAction<ChatProps[]>>, isServerIdle:boolean}) {
  return (
    <div className='rounded-xl shadow-lg bg-[#f5f6f8] overflow-hidden w-96 flex flex-col h-[700px]'>
      <TopBar isServerIdle={isServerIdle} />
      <Body chat={chat} isServerIdle={isServerIdle}  />
      <Input socket={socket} isServerIdle={isServerIdle}/>
    </div>
  )
}
