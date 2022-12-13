import { responseSchema, successResponse } from '~/application/common/responses'
import { Call } from '~/application/models'
import { protectedProcedure } from '~/server'

export const getCall = protectedProcedure
  .input(Call.getOneSchema)
  .output(
    responseSchema.extend({
      data: Call.schemaWithImageAndCategoryAndAnswers
    })
  )
  .query(async ({ input, ctx }) => {
    const response = await ctx.prisma.call.findFirstOrThrow({
      where: {
        AND: {
          id: input.id,
          user: { id: ctx.session.user.id }
        }
      },
      include: Call.prisma.includeCategoryAndImageAndAnswers
    })

    return successResponse({
      message: Call.Messages.LISTED,
      data: response
    })
  })
