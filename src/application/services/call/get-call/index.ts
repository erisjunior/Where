import { responseSchema, successResponse } from '~/application/common/responses'
import {
  Call,
  callWithAnswersSchema,
  getCallSchema
} from '~/application/models'
import { protectedProcedure } from '~/server'

export const getCall = protectedProcedure
  .input(getCallSchema)
  .output(responseSchema.extend({ data: callWithAnswersSchema }))
  .query(async ({ input, ctx }) => {
    const response = await ctx.prisma.call.findFirstOrThrow({
      where: {
        AND: {
          id: input.id,
          user: {
            id: ctx.session.user.id
          }
        }
      },
      include: {
        ...Call.prisma.includeCategoryAndImage,
        ...Call.prisma.includeAnswers
      }
    })

    return successResponse({
      message: Call.Messages.LISTED,
      data: response
    })
  })
