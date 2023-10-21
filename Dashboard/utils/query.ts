import { QueryClient, QueryKey } from '@tanstack/react-query'

export const queryClient = new QueryClient()

export function invalidate(key: QueryKey) {
  return queryClient.invalidateQueries({
    queryKey: key
  })
}