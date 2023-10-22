import React from 'react'

import { ChatbotDetails } from '@/lib/type/chatbot'

import KnowledgeSource from './KnowledgeSource'

function Settings({ chatbot,orgId }: { chatbot?: ChatbotDetails,orgId?: number }) {
  return (
    <div className='flex flex-1 w-3/5 pt-10 h-max'>
      <KnowledgeSource knowledgeSources={chatbot?.knowledgeBase.knowledgeSource} orgId={orgId} chatbotId={chatbot?.id}/>
    </div>
  )
}

export default Settings
