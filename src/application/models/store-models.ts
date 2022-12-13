import { Prisma } from '@prisma/client'
import { z } from 'zod'

import { Category } from './category-models'
import { Image } from './image-models'

export namespace Store {
  export const schema = z.object({
    id: z.string(),
    socialName: z.string(),
    fantasyName: z.string(),
    cnpj: z.string()
  })
  export const schemaWithImage = schema.extend({
    image: Image.schema
  })
  export const schemaWithImageAndCategories = schemaWithImage.extend({
    categories: Category.schema.array()
  })
  export const createSchema = z.object({
    socialName: z.string(),
    fantasyName: z.string(),
    cnpj: z.string(),
    categoryId: z.string()
  })

  export type Model = z.infer<typeof schema>
  export type ModelWithImage = z.infer<typeof schemaWithImage>
  export type ModelWithImageAndCategories = z.infer<
    typeof schemaWithImageAndCategories
  >
  export type CreateModel = z.infer<typeof createSchema>

  export enum Messages {
    CREATED = 'Store created successfully',
    CONFLICT = 'One of the following informations are already in use: Social Name or CPNJ',
    DETAILS = 'Store details returned successfully',
    LISTED = 'Stores listed successfully'
  }

  export const prisma = {
    includeImage: Prisma.validator<Prisma.StoreInclude>()({
      image: true
    }),
    includeImageAndCategories: Prisma.validator<Prisma.StoreInclude>()({
      image: true,
      categories: true
    })
  }
}
