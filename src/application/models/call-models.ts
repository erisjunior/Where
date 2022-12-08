import { Prisma } from '@prisma/client'
import { z } from 'zod'

import { categorySchema } from './category-models'
import { imageSchema } from './image-models'

export const createCallSchema = z.object({
  title: z.string(),
  description: z.string(),
  categoryId: z.string(),
  image: z.string()
})

export const callSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: categorySchema,
  image: imageSchema
})

export namespace Call {
  export type Model = z.infer<typeof callSchema>

  export type CreateCall = z.infer<typeof createCallSchema>

  export enum Messages {
    CREATED = 'Call created successfully',
    LISTED = 'All calls returned'
  }

  export const prisma = {
    includeCategoryAndImage: Prisma.validator<Prisma.CallInclude>()({
      category: true,
      image: true
    })
  }
}
