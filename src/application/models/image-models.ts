import { z } from 'zod'

export const imageSchema = z.object({
  id: z.string(),
  image: z.string(),
  imageKey: z.string()
})

export namespace Image {
  export type Model = z.infer<typeof imageSchema>

  export enum Messages {
    CREATED = 'Image created successfully'
  }

  export const prisma = {}
}
