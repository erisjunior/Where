import { useCallback } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import type { GetServerSideProps } from 'next'
import { getSession, signIn } from 'next-auth/react'
import Link from 'next/link'

import { SignIn, signInSchema } from '~/application/models'
import { Routes } from '~/presentation/common/router'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })

  if (session) {
    return {
      redirect: {
        destination: Routes.DASHBOARD,
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

const Login = () => {
  const { register, handleSubmit } = useForm<SignIn>({
    resolver: zodResolver(signInSchema)
  })

  const onSubmit = useCallback(async (data: SignIn) => {
    await signIn('credentials', { ...data, callbackUrl: Routes.DASHBOARD })
  }, [])

  return (
    <main>
      <form onSubmit={() => handleSubmit(onSubmit)}>
        <h2>Login</h2>
        <input
          type='email'
          placeholder='Type your email...'
          {...register('email')}
        />
        <input
          type='password'
          placeholder='Type your password...'
          {...register('password')}
        />
        <div>
          <Link href={Routes.REGISTER}>Go to register</Link>
          <button type='submit'>Login</button>
        </div>
      </form>
    </main>
  )
}

export default Login
