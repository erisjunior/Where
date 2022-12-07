import { hash } from 'bcryptjs'

import { conflictError } from '~/application/common/exceptions'
import { responseSchema, createdResponse } from '~/application/common/responses'
import { User, signUpSchema, userSchema } from '~/application/models'
import { procedure } from '~/server'

export const signUp = procedure
  .input(signUpSchema)
  .output(responseSchema.extend({ data: userSchema }))
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
      select: User.prisma.userSelect
    })

    return createdResponse({
      message: User.Messages.CREATED,
      data: response
    })
  })
