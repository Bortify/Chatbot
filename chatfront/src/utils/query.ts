import { QueryClient, QueryKey } from '@tanstack/react-query'
const queryClient = new QueryClient()

export function getQueryClient(): QueryClient {
  return queryClient
}

export function invalidate(key: QueryKey | undefined): void {
  queryClient.invalidateQueries({ queryKey: key })
}
