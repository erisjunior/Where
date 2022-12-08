import { responseSchema, successResponse } from '~/application/common/responses'
import { Category, categorySchema } from '~/application/models'
import { procedure } from '~/server'

export const getCategories = procedure
  .output(responseSchema.extend({ data: categorySchema.array() }))
  .query(async ({ ctx }) => {
    const response = await ctx.prisma.category.findMany({})

    return successResponse({
      message: Category.Messages.LISTED,
      data: response
    })
  })
