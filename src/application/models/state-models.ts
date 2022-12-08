import { z } from 'zod'

export const stateSchema = z.object({
  name: z.string(),
  initials: z.string()
})

export namespace State {
  export type Model = z.infer<typeof stateSchema>

  export enum Messages {
    CREATED = 'State created successfully'
  }

  export const prisma = {}
}
