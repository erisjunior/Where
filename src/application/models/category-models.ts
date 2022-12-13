import { z } from 'zod'

export namespace Category {
  export const schema = z.object({
    id: z.string(),
    name: z.string()
  })
  export const upsertSchema = z.object({
    id: z.string().optional(),
    name: z.string()
  })

  export type Model = z.infer<typeof schema>
  export type UpsertModel = z.infer<typeof upsertSchema>

  export enum Messages {
    UPSERTED = 'Category created or updated successfully',
    LISTED = 'Categories listed successfully'
  }

  export const prisma = {}
}
