// eslint-disable-next-line
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    id: any
    user: {
      id: string
      email: string
      username: string
    } & DefaultSession['user']
  }
}
