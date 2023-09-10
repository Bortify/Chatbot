import { Socket } from 'socket.io-client'
import Body from '../../components/Body'
import Input from '../../components/Input'
import TopBar from '../../components/TopBar'

export default function ChattingWindow({ socket }: { socket: Socket }) {
  return (
    <div className='rounded-t-xl shadow-lg bg-[#f8f8f8] overflow-hidden w-96'>
      <TopBar />
      <Body />
      <Input socket={socket}/>
    </div>
  )
}
