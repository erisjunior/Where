import { responseSchema, successResponse } from '~/application/common/responses'
import { Call, callSchema } from '~/application/models'
import { protectedProcedure } from '~/server'

export const getCalls = protectedProcedure
  .output(responseSchema.extend({ data: callSchema.array() }))
  .query(async ({ ctx }) => {
    const response = await ctx.prisma.call.findMany({
      where: {
        user: {
          id: ctx.session.user.id
        }
      },
      include: Call.prisma.includeCategoryAndImage
    })

    return successResponse({
      message: Call.Messages.LISTED,
      data: response
    })
  })
