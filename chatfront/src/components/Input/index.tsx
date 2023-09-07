import { Send, SmilePlus } from 'lucide-react'

export default function Input() {
  return (
    <div className='flex bg-white px-5 flex-col'>
      <div className='flex items-center w-full py-1 justify-center border-b border-b-gray-500'>
        <input
          className='flex flex-1 outline-none border-none px-2 py-4 text-[#222] placeholder:text-gray-700'
          placeholder='Type Your Message'
        />
        <Send className='text-[#222] w-6 h-6' />
      </div>
      <div className='w-full py-5 flex items-center justify-center'>
        <SmilePlus className='w-5 h-5 text-slate-500'/>
        <div className='flex flex-1'/>
      </div>
    </div>
  )
}
