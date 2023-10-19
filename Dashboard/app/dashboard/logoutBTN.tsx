'use client'
import { signOut } from "next-auth/react"

const LogoutBtn: React.FC<{}> = () => (
  <button
    className='px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700'
    onClick={() => {
      signOut()
    }}>
    Logout
  </button>
)

export default LogoutBtn
