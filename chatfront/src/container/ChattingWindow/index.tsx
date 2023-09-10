import { Socket } from 'socket.io-client'

import Body from '../../components/Body'
import Input from '../../components/Input'
import TopBar from '../../components/TopBar'
import { ChatProps } from '../../hooks/useBot'


export default function ChattingWindow({ socket, chat, setChat, isServerIdle }: { socket: Socket, chat: ChatProps[], setChat: React.Dispatch<React.SetStateAction<ChatProps[]>>, isServerIdle:boolean}) {
  return (
    <div className='rounded-t-xl shadow-lg bg-[#f8f8f8] overflow-hidden w-96'>
      <TopBar isServerIdle={isServerIdle} />
      <Body chat={chat} socket={socket}   />
      <Input socket={socket} util ={{setChat, chat}} isServerIdle={isServerIdle}/>
    </div>
  )
}
