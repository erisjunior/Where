import * as trpc from '@trpc/server'
import { hash } from 'argon2'

import { signUpSchema } from '~/application/models'
import { procedure } from '~/server'

export const signUp = procedure
  .input(signUpSchema)
  .mutation(async ({ input, ctx }) => {
    const exists = await ctx.prisma.user.findFirst({
      where: { OR: [{ email: input.email }, { username: input.username }] }
    })

    if (exists) {
      throw new trpc.TRPCError({
        code: 'CONFLICT',
        message: 'User already exists.'
      })
    }

    const hashedPassword = await hash(input.password)

    const result = await ctx.prisma.user.create({
      data: { ...input, password: hashedPassword }
    })

    return {
      status: 201,
      message: 'Account created successfully',
      result: result.email
    }
  })
