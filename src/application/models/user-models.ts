import { z } from 'zod'

import { validateCpf } from '~/application/common/validators'

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(12)
})

export const signUpSchema = signInSchema.extend({
  username: z.string(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  telphone: z.string(),
  cpf: z.string().refine(validateCpf, { message: 'Invalid CPF.' }),
  email: z.string().email()
})

export const userSchema = signUpSchema.extend({
  username: z.string(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  telphone: z.string(),
  email: z.string().email()
})

export type User = z.infer<typeof userSchema>
export type SignIn = z.infer<typeof signInSchema>
export type SignUp = z.infer<typeof signUpSchema>
