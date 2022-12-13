import { responseSchema, successResponse } from '~/application/common/responses'
import { Category } from '~/application/models'
import { procedure } from '~/server'

export const getCategories = procedure
  .output(responseSchema.extend({ data: Category.schema.array() }))
  .query(async ({ ctx }) => {
    const response = await ctx.prisma.category.findMany()

    return successResponse({
      message: Category.Messages.LISTED,
      data: response
    })
  })
