import { inferAsyncReturnType } from '@trpc/server'
import * as TRPCNextAdapter from '@trpc/server/adapters/next'
import { unstable_getServerSession } from 'next-auth'

import { nextAuthOptions } from '~/application/config/auth'
import { prisma } from '~/server/prisma'

export async function createContext(
  ctx: TRPCNextAdapter.CreateNextContextOptions
) {
  const { req, res } = ctx
  const session = await unstable_getServerSession(req, res, nextAuthOptions)

  return { req, res, session, prisma }
}

export type Context = inferAsyncReturnType<typeof createContext>
