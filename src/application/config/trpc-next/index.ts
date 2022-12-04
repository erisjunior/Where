import { httpBatchLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'

import type { ServerRouter } from '~/server/router'

function getBaseUrl() {
  if (typeof window !== 'undefined') return ''

  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`

  const port = process.env.PORT ?? 3000

  if (process.env.RENDER_INTERNAL_HOSTNAME)
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${port}`

  return `http://localhost:${port}`
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
