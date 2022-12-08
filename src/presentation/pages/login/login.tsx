import { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import type { GetServerSideProps } from 'next'
import { getSession, signIn } from 'next-auth/react'
import Link from 'next/link'

import { User, signInSchema } from '~/application/models'
import { classNames } from '~/presentation/common/helpers'
import { Routes } from '~/presentation/common/router'
import { Input } from '~/presentation/components'

const inputClass =
  'relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'

export const LoginGetServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })

  if (session) {
    return {
      redirect: {
        destination: Routes.CALLS,
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

const Login = () => {
  const formMethods = useForm<User.SignIn>({
    resolver: zodResolver(signInSchema)
  })

  const onSubmit = useCallback(async (data: User.SignIn) => {
    await signIn('credentials', { ...data, callbackUrl: Routes.CALLS })
  }, [])

  return (
    <div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
            Entrar
          </h2>
        </div>
        <FormProvider {...formMethods}>
          <form
            className='mt-8 space-y-6'
            onSubmit={formMethods.handleSubmit(onSubmit)}
          >
            <div className='-space-y-px rounded-md shadow-sm'>
              <Input
                name='email'
                type='email'
                autoComplete='email'
                required
                className={classNames(inputClass, 'rounded-t-md')}
                placeholder='Email'
              />
              <Input
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                required
                className={classNames(inputClass, 'rounded-b-md')}
                placeholder='Password'
              />
            </div>

            <div>
              <button
                type='submit'
                className='group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              >
                Entrar
              </button>
              <p className='mt-2 text-center text-sm text-gray-600'>
                <Link
                  href={Routes.REGISTER}
                  className='font-medium text-indigo-600 hover:text-indigo-500'
                >
                  Crie sua conta agora
                </Link>
              </p>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default Login
