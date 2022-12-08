import { useEffect } from 'react'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { useGetCallQuery } from '~/presentation/hooks'

const CallDetails = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const { data, isLoading, refetch } = useGetCallQuery({
    id: router.query.id as string
  })

  useEffect(() => {
    if (!session) return
    refetch()
  }, [session])

  return (
    <div className='flex flex-col p-2 sm:p-6 lg:p-8'>
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        <div className='flex flex-col'>
          <div className='flex items-center'>
            <Image
              className='h-20 w-20 rounded-full mr-4 bg-gray-300'
              src={data?.data.image.image ?? ''}
              alt='call'
              width={40}
              height={40}
            />
            <h2 className='text-2xl mb-2 lg:mb-0 font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>
              {data?.data.title}
            </h2>
          </div>
          <p className='text-xl mb-2 lg:mb-0 text-gray-700 sm:truncate'>
            {data?.data.description}
          </p>
          <p className='text-md mb-2 lg:mb-0 text-gray-500 sm:truncate'>
            Categoria: {data?.data.category.name}
          </p>
          <div className='grid mt-5 gap-2'>
            <span className='w-fit bg-indigo-100 text-indigo-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-200 dark:text-indigo-900'>
              {data?.data.answers.length ?? 0} Respostas
            </span>
            {data?.data.answers.map((answer) => (
              <div
                key={answer.id}
                className='flex items-center p-2 hover:bg-indigo-100 rounded'
              >
                <Image
                  className='h-10 w-10 rounded-full '
                  src={answer.store.image.image}
                  alt='profile'
                  width={40}
                  height={40}
                />
                <div className='ml-2'>
                  <p>{answer.store.fantasyName}</p>
                  <span className='text-xs'>{answer.message}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CallDetails
