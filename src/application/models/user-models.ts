import { z } from 'zod'

import { validateCpf } from '~/application/common/validators'

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export const signUpSchema = signInSchema.extend({
  username: z.string(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  telphone: z.string(),
  cpf: z.string().refine(validateCpf, { message: 'Invalid CPF.' })
})

export const userSchema = signUpSchema.extend({})

export namespace User {
  export type Model = z.infer<typeof userSchema>

  export type SignIn = z.infer<typeof signInSchema>
  export type SignUp = z.infer<typeof signUpSchema>

  export enum Messages {
    CREATED = 'User created successfully',
    CONFLICT = 'Email or username already in use'
  }
}
