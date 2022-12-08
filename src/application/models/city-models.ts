import { z } from 'zod'

export const citySchema = z.object({
  name: z.string()
})

export namespace City {
  export type Model = z.infer<typeof citySchema>

  export enum Messages {
    CREATED = 'City created successfully'
  }

  export const prisma = {}
}
