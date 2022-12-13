import { Prisma } from '@prisma/client'
import { z } from 'zod'

import { Answer } from './answer-models'
import { Category } from './category-models'
import { Image } from './image-models'

export namespace Call {
  export const schema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string()
  })
  export const schemaWithImageAndCategory = schema.extend({
    image: Image.schema,
    category: Category.schema
  })
  export const schemaWithImageAndCategoryAndAnswers =
    schemaWithImageAndCategory.extend({
      answers: Answer.schemaWithStore.array()
    })
  export const getOneSchema = z.object({
    id: z.string()
  })
  export const getByCategorySchema = z.object({
    category: z.string().optional()
  })
  export const upsertSchema = z.object({
    id: z.string().optional(),
    title: z.string(),
    description: z.string(),
    categoryId: z.string(),
    imageUrl: z.string()
  })

  export type Model = z.infer<typeof schema>
  export type ModelWithImageAndCategory = z.infer<
    typeof schemaWithImageAndCategory
  >
  export type ModelWithImageAndCategoryAndAnswers = z.infer<
    typeof schemaWithImageAndCategoryAndAnswers
  >
  export type GetOneModel = z.infer<typeof getOneSchema>
  export type GetByCategoryModel = z.infer<typeof getByCategorySchema>
  export type UpsertModel = z.infer<typeof upsertSchema>

  export enum Messages {
    UPSERTED = 'Call created or updated successfully',
    LISTED = 'All calls returned'
  }

  export const prisma = {
    includeCategoryAndImage: Prisma.validator<Prisma.CallInclude>()({
      category: true,
      image: true
    }),
    includeCategoryAndImageAndAnswers: Prisma.validator<Prisma.CallInclude>()({
      category: true,
      image: true,
      answers: { include: Answer.prisma.includeStoreWithImage }
    })
  }
}
