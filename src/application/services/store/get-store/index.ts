import { responseSchema, successResponse } from '~/application/common/responses'
import { Store, storeSchemaWithCategoriesAndImage } from '~/application/models'
import { protectedProcedure } from '~/server'

export const getStore = protectedProcedure
  .output(
    responseSchema.extend({
      data: storeSchemaWithCategoriesAndImage.nullable()
    })
  )
  .query(async ({ ctx }) => {
    const response = await ctx.prisma.store.findFirst({
      where: {
        user: {
          id: ctx.session.user.id
        }
      },
      include: {
        categories: true,
        image: true
      }
    })

    return successResponse({
      message: Store.Messages.LISTED,
      data: response
    })
  })
