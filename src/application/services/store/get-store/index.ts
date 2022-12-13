import { responseSchema, successResponse } from '~/application/common/responses'
import { Store } from '~/application/models'
import { protectedProcedure } from '~/server'

export const getStore = protectedProcedure
  .output(
    responseSchema.extend({
      data: Store.schemaWithImageAndCategories.nullable()
    })
  )
  .query(async ({ ctx }) => {
    const response = await ctx.prisma.store.findFirst({
      where: {
        user: { id: ctx.session.user.id }
      },
      include: Store.prisma.includeImageAndCategories
    })

    return successResponse({
      message: Store.Messages.DETAILS,
      data: response
    })
  })
