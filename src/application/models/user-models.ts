import { Prisma } from '@prisma/client'
import { z } from 'zod'

import { cpfSchema } from '~/application/common/schemas'

import { Address } from './address-models'

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export const signUpSchema = signInSchema.extend({
  username: z.string().min(6),
  firstName: z.string().min(1).max(18),
  lastName: z.string().min(1).max(18)
})

export const userSchema = z.object({
  email: z.string().email(),
  username: z.string().min(6),
  firstName: z.string().min(1).max(18),
  lastName: z.string().min(1).max(18),
  telphone: z.string().min(10).max(14).nullable(),
  cpf: cpfSchema.nullable()
})

export namespace User {
  export type Model = z.infer<typeof userSchema>

  export type SignIn = z.infer<typeof signInSchema>
  export type SignUp = z.infer<typeof signUpSchema>

  export enum Messages {
    CREATED = 'User created successfully',
    CONFLICT = 'One of the following informations are already in use: Username or Email'
  }

  export const prisma = {
    select: Prisma.validator<Prisma.UserSelect>()({
      username: true,
      firstName: true,
      lastName: true,
      telphone: true,
      email: true,
      cpf: true
    }),
    includeAddress: Prisma.validator<Prisma.UserInclude>()({
      address: {
        include: Address.prisma.includeCityWithState
      }
    })
  }
}
