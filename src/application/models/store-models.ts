import { Prisma } from '@prisma/client'
import { z } from 'zod'

import { User, userSchema } from './user-models'

export const createStoreSchema = z.object({
  socialName: z.string(),
  fantasyName: z.string(),
  cnpj: z.string(),
  user: userSchema
})

export const storeSchema = createStoreSchema.extend({
  user: userSchema
})

export namespace Store {
  export type Model = z.infer<typeof storeSchema>

  export type CreateStore = z.infer<typeof createStoreSchema>

  export enum Messages {
    CREATED = 'Store created successfully'
  }

  export const prisma = {
    includeUserWithAddress: Prisma.validator<Prisma.StoreInclude>()({
      user: {
        select: User.prisma.select,
        include: User.prisma.includeAddress
      }
    })
  }
}
