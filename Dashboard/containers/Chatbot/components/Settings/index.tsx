import React from 'react'

import { ChatbotDetails } from '@/lib/type/chatbot'

import KnowledgeSource from './KnowledgeSource'
import DangerZone from './DangerZone'

function Settings({
  chatbot,
  orgId,
}: {
  chatbot: ChatbotDetails
  orgId: number
}) {
  return (
    <div className='flex flex-col flex-1 w-3/5 gap-5 pt-10 h-max'>
      <KnowledgeSource
        knowledgeSources={chatbot.knowledgeBase.knowledgeSource}
        orgId={orgId}
        chatbotId={chatbot.id}
      />
      <DangerZone chatbot={chatbot} orgId={orgId}/>
    </div>
  )
}

export default Settings
