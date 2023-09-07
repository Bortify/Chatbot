import Body from '../../components/Body'
import Input from '../../components/Input'
import TopBar from '../../components/TopBar'

export default function ChattingWindow() {
  return (
    <div className='rounded-t-xl shadow-lg bg-[#f8f8f8] overflow-hidden w-96'>
      <TopBar />
      <Body />
      <Input />
    </div>
  )
}
