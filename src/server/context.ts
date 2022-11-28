import { inferAsyncReturnType } from '@trpc/server'

import { prisma } from '~/server'

export async function createContext() {
  return { prisma }
}

export type Context = inferAsyncReturnType<typeof createContext>
