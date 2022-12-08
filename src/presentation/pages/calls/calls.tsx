import { useEffect } from 'react'

import { PlusIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

import { Routes } from '~/presentation/common/router'
import { useGetCallsQuery } from '~/presentation/hooks'

const Dashboard = () => {
  const { data: session } = useSession()
  const { data, isLoading, refetch } = useGetCallsQuery()

  useEffect(() => {
    if (!session) return
    refetch()
  }, [session])

  return (
    <div className='flex flex-col p-2 sm:p-6 lg:p-8'>
      <div className='flex flex-col lg:flex-row justify-between'>
        <h2 className='text-2xl mb-2 lg:mb-0 font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>
          Chamados
        </h2>
        <div className='flex'>
          <Link
            href={Routes.CREATE_CALL}
            type='button'
            className='inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
          >
            <PlusIcon className='-ml-1 mr-2 h-5 w-5' aria-hidden='true' />
            Criar Chamado
          </Link>
        </div>
      </div>
      <div className='grid mt-5 gap-1'>
        <span className='w-fit bg-indigo-100 text-indigo-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-200 dark:text-indigo-900'>
          {data?.data.length ?? 0} Chamados
        </span>
        {isLoading && <p>Carregando...</p>}
        {data?.data.map((call) => (
          <div className='flex items-center' key={call.id}>
            <Image
              className='h-10 w-10 rounded-full '
              src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
              alt='profile'
              width={40}
              height={40}
            />
            <div>
              <p>{call.title}</p>
              <span>{call.category.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
