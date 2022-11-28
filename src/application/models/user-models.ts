import { z } from 'zod'

export const User = z.object({
  username: z.string(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  telphone: z.string(),
  email: z.string().email()
})

export type User = z.infer<typeof User>
