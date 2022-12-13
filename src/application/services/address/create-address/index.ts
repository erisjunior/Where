import { createdResponse, responseSchema } from '~/application/common/responses'
import { Address } from '~/application/models'
import { protectedProcedure } from '~/server'

export const createAddress = protectedProcedure
  .input(Address.createSchema)
  .output(responseSchema.extend({ data: Address.schemaWithCity }))
  .mutation(async ({ input, ctx }) => {
    const { cityId, ...address } = input
    const response = await ctx.prisma.address.create({
      data: {
        ...address,
        city: {
          connect: { id: cityId }
        },
        user: {
          connect: { id: ctx.session.user.id }
        }
      },
      include: Address.prisma.includeCityWithState
    })

    return createdResponse({
      message: Address.Messages.CREATED,
      data: response
    })
  })
