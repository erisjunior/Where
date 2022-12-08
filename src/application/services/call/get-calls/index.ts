import { responseSchema, successResponse } from '~/application/common/responses'
import { Call, callSchema, getCallsSchema } from '~/application/models'
import { protectedProcedure } from '~/server'

export const getCalls = protectedProcedure
  .input(getCallsSchema)
  .output(responseSchema.extend({ data: callSchema.array() }))
  .query(async ({ input, ctx }) => {
    const response = await ctx.prisma.call.findMany({
      where: input.category
        ? {
            category: {
              id: input.category
            }
          }
        : {
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
