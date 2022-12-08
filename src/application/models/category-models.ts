import { z } from 'zod'

export const categorySchema = z.object({
  id: z.string(),
  name: z.string()
})

export namespace Category {
  export type Model = z.infer<typeof categorySchema>

  export enum Messages {
    CREATED = 'Category created successfully'
  }

  export const prisma = {}
}
