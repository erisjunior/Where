import { Prisma } from '@prisma/client'
import { z } from 'zod'

import { City } from './city-models'

export namespace Address {
  export const schema = z.object({
    id: z.string(),
    street: z.string(),
    number: z.string(),
    complementary: z.string(),
    zip: z.string()
  })
  export const schemaWithCity = schema.extend({
    city: City.schemaWithState
  })
  export const createSchema = schema.extend({
    street: z.string(),
    number: z.string(),
    complementary: z.string(),
    zip: z.string(),
    cityId: z.string()
  })

  export type Model = z.infer<typeof schema>
  export type ModelWithCity = z.infer<typeof schemaWithCity>
  export type CreateModel = z.infer<typeof createSchema>

  export enum Messages {
    CREATED = 'Address created successfully'
  }

  export const prisma = {
    includeCityWithState: Prisma.validator<Prisma.AddressInclude>()({
      city: { include: City.prisma.includeState }
    })
  }
}
