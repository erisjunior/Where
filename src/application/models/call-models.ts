import { Prisma } from '@prisma/client'
import { z } from 'zod'

import { Answer, answerSchema } from './answer-models'
import { categorySchema } from './category-models'
import { imageSchema } from './image-models'

export const callSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  category: categorySchema,
  image: imageSchema
})

export const callWithAnswersSchema = callSchema.extend({
  answers: answerSchema.array()
})

export const createCallSchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  description: z.string(),
  categoryId: z.string(),
  image: z.string()
})

export const getCallSchema = z.object({
  id: z.string()
})

export const getCallsSchema = z.object({
  category: z.string().optional()
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
    }),
    includeAnswers: Prisma.validator<Prisma.CallInclude>()({
      answers: { include: Answer.prisma.includeStoreWithUser }
    })
  }
}
