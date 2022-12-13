import { responseSchema, successResponse } from '~/application/common/responses'
import { Call } from '~/application/models'
import { protectedProcedure } from '~/server'

export const getCalls = protectedProcedure
  .input(Call.getByCategorySchema)
  .output(
    responseSchema.extend({
      data: Call.schemaWithImageAndCategory.array()
    })
  )
  .query(async ({ input, ctx }) => {
    const where = input.category
      ? { category: { id: input.category } }
      : { user: { id: ctx.session.user.id } }

    const response = await ctx.prisma.call.findMany({
      where,
      include: Call.prisma.includeCategoryAndImage
    })

    return successResponse({
      message: Call.Messages.LISTED,
      data: response
    })
  })
