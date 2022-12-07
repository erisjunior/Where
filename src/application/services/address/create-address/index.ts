import { responseSchema, createdResponse } from '~/application/common/responses'
import { Address, addressSchema } from '~/application/models'
import { protectedProcedure } from '~/server'

export const createAddress = protectedProcedure
  .input(addressSchema)
  .output(responseSchema.extend({ data: addressSchema }))
  .mutation(async ({ input, ctx }) => {
    const response = await ctx.prisma.address.create({
      data: {
        street: input.street,
        number: input.number,
        complementary: input.complementary,
        zip: input.zip,
        user: {
          connect: {
            id: ctx.session.user.id
          }
        },
        city: {
          connectOrCreate: {
            where: {
              id: input.city
            },
            create: {
              name: input.city,
              state: {
                connectOrCreate: {
                  where: {
                    id: input.state
                  },
                  create: {
                    name: input.state,
                    initials: input.state
                  }
                }
              }
            }
          }
        }
      },
      select: Address.prisma.addressSelect
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
