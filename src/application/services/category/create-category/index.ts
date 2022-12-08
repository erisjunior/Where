import { responseSchema, createdResponse } from '~/application/common/responses'
import {
  Category,
  categorySchema,
  createCategorySchema
} from '~/application/models'
import { protectedProcedure } from '~/server'

export const createCategory = protectedProcedure
  .input(createCategorySchema)
  .output(responseSchema.extend({ data: categorySchema }))
  .mutation(async ({ input, ctx }) => {
    const response = await ctx.prisma.category.upsert({
      where: {
        id: input.id ?? ''
      },
      create: {
        name: input.name
      },
      update: {
        name: input.name
      }
    })

    return createdResponse({
      message: Category.Messages.CREATED,
      data: response
    })
  })
