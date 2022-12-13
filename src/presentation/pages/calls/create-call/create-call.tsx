import { useCallback, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { z } from 'zod'

import { Call } from '~/application/models'
import { Routes } from '~/presentation/common/router'
import { Button, Input } from '~/presentation/components'
import {
  useGetCategoriesQuery,
  useUpsertCallMutation
} from '~/presentation/hooks'

const inputClass =
  'relative block w-full rounded mt-2 appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'

const formSchema = Call.upsertSchema.omit({ categoryId: true })
type Form = z.infer<typeof formSchema>

export default function CreateCall() {
  const router = useRouter()
  const formMethods = useForm<Form>({
    resolver: zodResolver(formSchema)
  })

  const { data: categories } = useGetCategoriesQuery()

  const [category, setCategory] = useState('')

  const { mutateAsync: upsertCall } = useUpsertCallMutation()

  useEffect(() => {
    if ((categories?.data.length ?? 0) > 0) {
      setCategory(categories?.data[0].id as string)
    }
  }, [categories, setCategory])

  const onSubmit = useCallback(
    async (data: Form) => {
      try {
        await upsertCall({ ...data, categoryId: category })
        router.push(Routes.CALLS)
      } catch (error) {}
    },
    [upsertCall, category]
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
            <select className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'>
              {categories?.data.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                  onClick={() => setCategory(category.id)}
                >
                  {category.name}
                </option>
              ))}
            </select>
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
