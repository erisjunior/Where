import { createdResponse, responseSchema } from '~/application/common/responses'
import { Call } from '~/application/models'
import { protectedProcedure } from '~/server'

export const upsertCall = protectedProcedure
  .input(Call.upsertSchema)
  .output(responseSchema.extend({ data: Call.schemaWithImageAndCategory }))
  .mutation(async ({ input, ctx }) => {
    const response = await ctx.prisma.call.upsert({
      where: {
        id: input.id ?? ''
      },
      create: {
        title: input.title,
        description: input.description,
        category: {
          connect: { id: input.categoryId }
        },
        image: {
          create: {
            image: input.imageUrl,
            imageKey: input.imageUrl
          }
        },
        user: {
          connect: { id: ctx.session.user.id }
        }
      },
      update: {
        title: input.title,
        description: input.description,
        image: {
          update: {
            image: input.imageUrl,
            imageKey: input.imageUrl
          }
        }
      },
      include: Call.prisma.includeCategoryAndImage
    })

    return createdResponse({
      message: Call.Messages.UPSERTED,
      data: response
    })
  })
