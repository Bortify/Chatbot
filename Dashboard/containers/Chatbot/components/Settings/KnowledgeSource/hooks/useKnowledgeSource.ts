import { useCallback, useEffect, useRef, useState } from 'react'

import { ChatbotDetails } from '@/lib/type/chatbot'
import { getKnowledgeStatus } from '@/api/browser/knowledge'
import { knowledgeSourceStatus } from '@/constants/knowledgeSource'

export function useKnowledgeSource({
  knowledgeSource,
  chatbotId,
  orgId,
}: {
  knowledgeSource: ChatbotDetails['knowledgeBase']['knowledgeSource']['0']
  orgId: number
  chatbotId: number
}) {
  const [status, setStatus] = useState<keyof typeof knowledgeSourceStatus>(
    knowledgeSource.status
  )

  const timerIdRef = useRef<NodeJS.Timeout>()
  const [isPollingEnabled, setIsPollingEnabled] = useState(true)

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await getKnowledgeStatus({
          knowledgeId: knowledgeSource.id,
          chatbotId,
          orgId,
        })
        setStatus(res.status)
        if (res.status !== 'PROCESSING') {
          setIsPollingEnabled(false)
        }
      } catch (e) {
        console.log(e)
        setIsPollingEnabled(false)
      }
    }

    const startPolling = () => {
      timerIdRef.current = setInterval(fetchStatus, 2000)
    }

    const stopPolling = () => {
      clearInterval(timerIdRef.current)
    }

    if (isPollingEnabled) {
      startPolling()
    } else {
      stopPolling()
    }

    return () => {
      stopPolling()
    }
  }, [chatbotId, isPollingEnabled, knowledgeSource.id, orgId, status])

  return {
    status,
    knowledgeSource,
  }
}
