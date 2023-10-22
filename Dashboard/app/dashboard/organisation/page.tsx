import { redirect } from 'next/navigation'

function Page() {
  return (
    redirect('/dashboard')
  )
}

export default Page