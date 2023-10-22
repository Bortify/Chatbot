import { redirect } from "next/navigation"

type PagePropsType = {
  params: {
    orgId: number
  }
}

function ChatbotPage({ params }: PagePropsType) {
  return redirect(`/dashboard/organisation/${params.orgId}`)
}

export default ChatbotPage
