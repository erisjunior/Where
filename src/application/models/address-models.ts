import { Prisma } from '@prisma/client'
import { z } from 'zod'

export const addressSchema = z.object({
  street: z.string(),
  number: z.string(),
  complementary: z.string(),
  zip: z.string(),
  city: z.string(),
  state: z.string()
})

export namespace Address {
  export type Model = z.infer<typeof addressSchema>

  export enum Messages {
    CREATED = 'Address created successfully'
  }

  export const prisma = {
    addressSelect: Prisma.validator<Prisma.AddressSelect>()({
      id: true,
      street: true,
      number: true,
      complementary: true,
      zip: true,
      city: {
        include: {
          state: true
        }
      }
    })
  }
}