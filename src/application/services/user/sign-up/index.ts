import { hash } from 'bcryptjs'

import { conflictError } from '~/application/common/exceptions'
import { createdResponse, responseSchema } from '~/application/common/responses'
import { User } from '~/application/models'
import { procedure } from '~/server'

export const signUp = procedure
  .input(User.signUpSchema)
  .output(responseSchema.extend({ data: User.schema }))
  .mutation(async ({ input, ctx }) => {
    const exists = await ctx.prisma.user.findFirst({
      where: {
        OR: [{ email: input.email }, { username: input.username }]
      }
    })

    if (exists) {
      throw conflictError(User.Messages.CONFLICT)
    }

    const hashedPassword = await hash(input.password, 10)

    const response = await ctx.prisma.user.create({
      data: { ...input, password: hashedPassword },
      select: User.prisma.select
    })

    return createdResponse({
      message: User.Messages.CREATED,
      data: response
    })
  })
