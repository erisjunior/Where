import { responseSchema, createdResponse } from '~/application/common/responses'
import { Address, addressSchema } from '~/application/models'
import { protectedProcedure } from '~/server'

export const createAddress = protectedProcedure
  .input(addressSchema)
  .output(responseSchema.extend({ data: addressSchema }))
  .mutation(async ({ input, ctx }) => {
    const { city, state, ...address } = input
    const response = await ctx.prisma.address.create({
      data: {
        ...address,
        city: {
          connectOrCreate: {
            where: {
              id: city
            },
            create: {
              name: city,
              state: {
                connectOrCreate: {
                  where: {
                    id: state
                  },
                  create: {
                    name: state,
                    initials: state
                  }
                }
              }
            }
          }
        },
        user: {
          connect: {
            id: ctx.session.user.id
          }
        }
      },
      include: Address.prisma.includeCityWithState
    })

    const formatedResponse: Address.Model = {
      street: response.street,
      number: response.number,
      complementary: response.complementary,
      zip: response.zip,
      city: response.city.name,
      state: response.city.state.name
    }

    return createdResponse({
      message: Address.Messages.CREATED,
      data: formatedResponse
    })
  })
