import { useCallback } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { signUpSchema, SignUp } from '~/application/models'
import { Routes } from '~/presentation/common/router'
import { useSignUpMutation } from '~/presentation/hooks'

export default function Register() {
  const router = useRouter()
  const { register, handleSubmit } = useForm<SignUp>({
    resolver: zodResolver(signUpSchema)
  })

  const { mutateAsync: signUp } = useSignUpMutation()

  const onSubmit = useCallback(
    async (data: SignUp) => {
      const result = await signUp(data)
      if (result.status === 201) {
        router.push(Routes.LOGIN)
      }
    },
    [signUp, router]
  )

  return (
    <main>
      <form
        className='flex items-center justify-center h-screen w-full'
        onSubmit={() => handleSubmit(onSubmit)}
      >
        <h2>Register</h2>
        <input
          type='text'
          placeholder='Type your username...'
          {...register('username')}
        />
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
          <Link href={Routes.LOGIN} className='link'>
            Go to login
          </Link>
          <button type='submit'>Register</button>
        </div>
      </form>
    </main>
  )
}
