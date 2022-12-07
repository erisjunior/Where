import { responseSchema, createdResponse } from '~/application/common/responses'
import { Store, storeSchema, createStoreSchema } from '~/application/models'
import { protectedProcedure } from '~/server'

export const createStore = protectedProcedure
  .input(createStoreSchema)
  .output(responseSchema.extend({ data: storeSchema }))
  .mutation(async ({ input, ctx }) => {
    const response = await ctx.prisma.store.create({
      data: {
        ...input,
        user: {
          connect: {
            id: ctx.session.user.id
          }
        }
      },
      select: Store.prisma.storeSelect
    })

    return createdResponse({
      message: Store.Messages.CREATED,
      data: response
    })
  })
