import { Prisma } from '@prisma/client'
import { z } from 'zod'

import { State } from './state-models'

export namespace City {
  export const schema = z.object({
    id: z.string(),
    name: z.string()
  })
  export const schemaWithState = schema.extend({
    state: State.schema
  })
  export const createSchema = z.object({
    name: z.string()
  })

  export type Model = z.infer<typeof schema>
  export type ModelWithState = z.infer<typeof schemaWithState>
  export type CreateModel = z.infer<typeof createSchema>

  export enum Messages {
    CREATED = 'City created successfully'
  }

  export const prisma = {
    includeState: Prisma.validator<Prisma.CityInclude>()({
      state: true
    })
  }
}
