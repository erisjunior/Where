import { Prisma } from '@prisma/client'
import { z } from 'zod'

import { categorySchema } from './category-models'
import { imageSchema } from './image-models'

export const createStoreSchema = z.object({
  socialName: z.string(),
  fantasyName: z.string(),
  cnpj: z.string(),
  categoryId: z.string()
})

export const storeSchema = createStoreSchema.extend({})

export const storeSchemaWithCategoriesAndImage = z.object({
  id: z.string(),
  socialName: z.string(),
  fantasyName: z.string(),
  cnpj: z.string(),
  categories: categorySchema.array(),
  image: imageSchema
})

export const storeSchemaWithImages = z.object({
  socialName: z.string(),
  fantasyName: z.string(),
  cnpj: z.string(),
  image: imageSchema
})

export namespace Store {
  export type Model = z.infer<typeof storeSchema>

  export type CreateStore = z.infer<typeof createStoreSchema>

  export enum Messages {
    CREATED = 'Store created successfully',
    LISTED = 'Store listed successfully'
  }

  export const prisma = {
    includeUserWithAddress: Prisma.validator<Prisma.StoreInclude>()({
      image: true
    })
  }
}
