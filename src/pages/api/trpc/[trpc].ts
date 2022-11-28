import * as TRPCNextAdapter from '@trpc/server/adapters/next'

import { createContext, serverRouter } from '~/server'

export default TRPCNextAdapter.createNextApiHandler({
  router: serverRouter,
  createContext
})
