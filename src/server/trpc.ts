import { initTRPC } from '@trpc/server'

import { Context } from '~/server'

const t = initTRPC.context<Context>().create()

export const router = t.router
export const procedure = t.procedure
