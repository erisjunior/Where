import { httpBatchLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'

import type { ServerRouter } from '~/server/router'

function getBaseUrl() {
  if (typeof window !== 'undefined') return ''

  if (!process.env.APP_URL) return ''

  return process.env.APP_URL
}

export const trpcNext = createTRPCNext<ServerRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`
        })
      ]
    }
  },
  ssr: true
})
