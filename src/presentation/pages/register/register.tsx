import { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

import { signUpSchema, User } from '~/application/models'
import { classNames } from '~/presentation/common/helpers'
import { Routes } from '~/presentation/common/router'
import { Input } from '~/presentation/components'
import { useSignUpMutation } from '~/presentation/hooks'

const inputClass =
  'relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'

export default function Register() {
  const formMethods = useForm<User.SignUp>({
    resolver: zodResolver(signUpSchema)
  })

  const { mutateAsync: signUp } = useSignUpMutation()

  const onSubmit = useCallback(
    async (data: User.SignUp) => {
      try {
        await signUp(data)
        await signIn('credentials', {
          email: data.email,
          password: data.password,
          callbackUrl: Routes.DASHBOARD
        })
      } catch (error) {}
    },
    [signUp]
  )

  return (
    <main>
      <div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='w-full max-w-md space-y-8'>
          <div>
            <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
              Crie uma conta agora
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
                  className={classNames(inputClass, 'rounded-md')}
                  placeholder='Email'
                />
                <Input
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  className={inputClass}
                  placeholder='Password'
                />
                <Input
                  name='username'
                  type='text'
                  required
                  className={inputClass}
                  placeholder='Username'
                />
                <Input
                  name='firstName'
                  type='text'
                  required
                  className={inputClass}
                  placeholder='First Name'
                />
                <Input
                  name='lastName'
                  type='text'
                  required
                  className={classNames(inputClass, 'rounded-b-md')}
                  placeholder='Last Name'
                />
              </div>

              <div>
                <button
                  type='submit'
                  className='group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                >
                  Cadastrar
                </button>
                <p className='mt-2 text-center text-sm text-gray-600'>
                  <Link
                    href={Routes.LOGIN}
                    className='font-medium text-indigo-600 hover:text-indigo-500'
                  >
                    Entre na sua conta
                  </Link>
                </p>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </main>
  )
}
