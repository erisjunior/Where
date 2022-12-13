import { conflictError } from '~/application/common/exceptions'
import { createdResponse, responseSchema } from '~/application/common/responses'
import { Store } from '~/application/models'
import { protectedProcedure } from '~/server'

export const createStore = protectedProcedure
  .input(Store.createSchema)
  .output(responseSchema.extend({ data: Store.schemaWithImageAndCategories }))
  .mutation(async ({ input, ctx }) => {
    const { categoryId, ...store } = input

    const exists = await ctx.prisma.store.findFirst({
      where: {
        OR: [{ cnpj: store.cnpj }, { socialName: store.socialName }]
      }
    })

    if (exists) {
      throw conflictError(Store.Messages.CONFLICT)
    }

    const response = await ctx.prisma.store.create({
      data: {
        ...store,
        categories: {
          connect: { id: categoryId }
        },
        user: {
          connect: { id: ctx.session.user.id }
        },
        image: {
          create: {
            image:
              'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            imageKey:
              'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
          }
        }
      },
      include: Store.prisma.includeImageAndCategories
    })

    return createdResponse({
      message: Store.Messages.CREATED,
      data: response
    })
  })
