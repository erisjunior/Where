import { compare } from 'bcryptjs'
import { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { signInSchema } from '~/application/models'
import { Routes } from '~/presentation/common/router'
import { prisma } from '~/server/prisma'

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'email@gmail.com'
        },
        password: {
          label: 'Password',
          type: 'password'
        }
      },
      authorize: async (credentials) => {
        const { email, password } = await signInSchema.parseAsync(credentials)

        const user = await prisma.user.findFirst({
          where: { email }
        })

        if (!user) {
          return null
        }

        const isValidPassword = await compare(user.password, password)

        if (!isValidPassword) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          username: user.username
        }
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id
        token.email = user.email
      }

      return token
    },
    session: async ({ session, token }) => {
      if (token) {
        session.id = token.id
      }

      return session
    }
  },
  jwt: {
    maxAge: 15 * 24 * 30 * 60 // 15 days
  },
  pages: {
    signIn: Routes.HOME,
    newUser: Routes.HOME,
    error: Routes.NOT_FOUND
  }
}
