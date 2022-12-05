import { initTRPC, TRPCError } from '@trpc/server'

import { Context } from '~/server/context'

const t = initTRPC.context<Context>().create()

const isAuthorized = t.middleware(async ({ next, ctx }) => {
  if (!ctx.session?.user.id) {
    throw new TRPCError({
      code: 'UNAUTHORIZED'
    })
  }
  return next({
    ctx: { session: ctx.session }
  })
})

export const middleware = t.middleware
export const router = t.router
export const procedure = t.procedure
export const protectedProcedure = t.procedure.use(isAuthorized)
