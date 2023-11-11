import { CHAT_DETAILS_KEY } from '../constants/keys'

type SavedChatDetails = {
  lastUpdatedAt?: Date
  msgCount: number
}

export function chatDetailsUtil(
  operation: 'GET' | 'SET' | 'UPSERT' | 'UPDATE_COUNT',
  data?: SavedChatDetails
): SavedChatDetails | null {
  const defaultData: SavedChatDetails = {
    lastUpdatedAt: new Date(),
    msgCount: 0,
  }

  if (operation === 'GET') {
    const retrieved = localStorage.getItem(CHAT_DETAILS_KEY)
    if (retrieved) {
      return JSON.parse(retrieved)
    }
    return null
  } else if (operation === 'SET') {
    if (!data) throw new Error('data is needed')
    localStorage.setItem(CHAT_DETAILS_KEY, JSON.stringify(data))
    return data
  } else if (operation === 'UPSERT') {
    const saved: SavedChatDetails | null = chatDetailsUtil('GET')
    if (!saved) {
      chatDetailsUtil('SET', defaultData)
      return defaultData
    }
    return saved
  } else if(operation === 'UPDATE_COUNT'){
    const saved: SavedChatDetails | null = chatDetailsUtil('GET')
    if(saved){
        chatDetailsUtil('SET',{
            lastUpdatedAt: saved.lastUpdatedAt,
            msgCount: data?.msgCount || 0
        })
    }
  }
  return null
}
