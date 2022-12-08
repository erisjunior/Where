import { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { z } from 'zod'

import { createCallSchema } from '~/application/models'
import { Routes } from '~/presentation/common/router'
import { Button, Input } from '~/presentation/components'
import { useCreateCallMutation } from '~/presentation/hooks'

const inputClass =
  'relative block w-full rounded mt-2 appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'

const formSchema = createCallSchema.omit({ categoryId: true }).extend({
  category: z.string()
})
type Form = z.infer<typeof formSchema>

export default function CreateCall() {
  const router = useRouter()
  const formMethods = useForm<Form>({
    resolver: zodResolver(formSchema)
  })

  const { mutateAsync: createCall } = useCreateCallMutation()

  const onSubmit = useCallback(
    async (data: Form) => {
      try {
        await createCall({ ...data, categoryId: data.category })
        router.push(Routes.CALLS)
      } catch (error) {}
    },
    [createCall]
  )

  return (
    <div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='w-full max-w-md space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
            Crie um chamado
          </h2>
        </div>
        <FormProvider {...formMethods}>
          <form
            className='mt-8 space-y-6'
            onSubmit={formMethods.handleSubmit(onSubmit)}
          >
            <Input
              name='title'
              type='text'
              required
              className={inputClass}
              placeholder='Title'
            />
            <Input
              name='description'
              type='text'
              required
              className={inputClass}
              placeholder='Description'
            />
            <Input
              name='image'
              type='text'
              required
              className={inputClass}
              placeholder='Image Url'
            />
            <Input
              name='category'
              type='text'
              required
              className={inputClass}
              placeholder='Category'
            />
            <div>
              <Button
                type='submit'
                className='group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              >
                Criar
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
