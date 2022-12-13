import { createdResponse, responseSchema } from '~/application/common/responses'
import { Category } from '~/application/models'
import { protectedProcedure } from '~/server'

export const upsertCategory = protectedProcedure
  .input(Category.upsertSchema)
  .output(responseSchema.extend({ data: Category.schema }))
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
      message: Category.Messages.UPSERTED,
      data: response
    })
  })
