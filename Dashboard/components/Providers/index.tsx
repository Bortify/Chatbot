'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SessionProvider } from 'next-auth/react'
import { ReactNode, useState } from 'react'

import { queryClient } from '@/utils/query'

const Providers: React.FC<{
  children: ReactNode
}> = ({ children }) => {
  const [qClient] = useState<QueryClient>(queryClient)
  return (
    <QueryClientProvider client={qClient}>
      <SessionProvider>{children}</SessionProvider>
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools client={qClient} />
      )}
    </QueryClientProvider>
  )
}

export default Providers
