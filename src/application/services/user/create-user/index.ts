import { User } from '~/application/models'
import { procedure } from '~/server'

export const createUser = procedure
  .input(User)
  .mutation(async ({ input, ctx }) => {
    await ctx.prisma.user.create({
      data: input
    })
  })
