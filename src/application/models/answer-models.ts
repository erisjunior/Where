import { Prisma } from '@prisma/client'
import { z } from 'zod'

import { Store } from './store-models'

export namespace Answer {
  export const schema = z.object({
    id: z.string(),
    message: z.string()
  })
  export const schemaWithStore = schema.extend({
    store: Store.schemaWithImage
  })
  export const createAnswerSchema = z.object({
    message: z.string(),
    storeId: z.string(),
    callId: z.string()
  })

  export type Model = z.infer<typeof schema>
  export type ModelWithStore = z.infer<typeof schemaWithStore>
  export type CreateModel = z.infer<typeof createAnswerSchema>

  export enum Messages {
    CREATED = 'Answer created successfully',
    CONFLICT = 'One answer from your store already exists for this call'
  }

  export const prisma = {
    includeStoreWithImage: Prisma.validator<Prisma.AnswerInclude>()({
      store: { include: Store.prisma.includeImage }
    })
  }
}
