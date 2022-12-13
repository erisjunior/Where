import { z } from 'zod'

export namespace State {
  export const schema = z.object({
    id: z.string(),
    name: z.string(),
    initial: z.string().length(2)
  })
  export const createSchema = z.object({
    name: z.string(),
    initial: z.string().length(2)
  })

  export type Model = z.infer<typeof schema>
  export type CreateModel = z.infer<typeof createSchema>

  export enum Messages {
    CREATED = 'State created successfully'
  }

  export const prisma = {}
}
