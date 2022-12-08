import { responseSchema, createdResponse } from '~/application/common/responses'
import { Call, callSchema, createCallSchema } from '~/application/models'
import { protectedProcedure } from '~/server'

export const createCall = protectedProcedure
  .input(createCallSchema)
  .output(responseSchema.extend({ data: callSchema }))
  .mutation(async ({ input, ctx }) => {
    const response = await ctx.prisma.call.create({
      data: {
        title: input.title,
        description: input.description,
        category: {
          connect: {
            id: input.categoryId
          }
        },
        image: {
          create: {
            image: input.image,
            imageKey: input.image
          }
        },
        user: {
          connect: {
            id: ctx.session.user.id
          }
        }
      },
      include: Call.prisma.includeCategoryAndImage
    })

    return createdResponse({
      message: Call.Messages.CREATED,
      data: response
    })
  })