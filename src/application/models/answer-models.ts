import { Prisma } from '@prisma/client'
import { z } from 'zod'

import { Store, storeSchemaWithImages } from './store-models'

export const answerSchema = z.object({
  id: z.string(),
  message: z.string(),
  store: storeSchemaWithImages
})

export const answerDefaultSchema = z.object({
  id: z.string(),
  message: z.string()
})

export const createAnswerSchema = z.object({
  message: z.string(),
  storeId: z.string(),
  callId: z.string()
})

export namespace Answer {
  export type Model = z.infer<typeof answerSchema>

  export enum Messages {
    CREATED = 'Answer created successfully'
  }

  export const prisma = {
    includeStoreWithUser: Prisma.validator<Prisma.AnswerInclude>()({
      store: {
        include: Store.prisma.includeUserWithAddress
      }
    })
  }
}
