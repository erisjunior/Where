import { useEffect } from 'react'

import { PlusIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

import { Routes } from '~/presentation/common/router'
import { useGetStoreQuery } from '~/presentation/hooks'

import StoreCalls from './store-calls'

const StoreDetails = () => {
  const { data: session } = useSession()

  const { data, isLoading, refetch } = useGetStoreQuery()

  useEffect(() => {
    if (!session) return
    refetch()
  }, [session])

  return (
    <div className='flex flex-col p-2 sm:p-6 lg:p-8'>
      {isLoading ? (
        <p>Carregando...</p>
      ) : data?.data ? (
        <div>
          <div className='flex flex-col'>
            <div className='flex items-center'>
              <Image
                className='h-20 w-20 rounded-full mr-4 bg-gray-300'
                src='https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
                alt='call'
                width={40}
                height={40}
              />
              <h2 className='text-2xl mb-2 lg:mb-0 font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>
                {data?.data.fantasyName}
              </h2>
            </div>
            <p className='text-xl mb-2 lg:mb-0 text-gray-700 sm:truncate'>
              {data?.data.socialName}
            </p>
            <p className='text-md mb-2 lg:mb-0 text-gray-500 sm:truncate'>
              CNPJ: {data?.data.cnpj}
            </p>
            <StoreCalls
              category={data.data.categories[0].id}
              storeId={data.data.id}
            />
          </div>
        </div>
      ) : (
        <Link
          href={Routes.CREATE_STORE}
          type='button'
          className='inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
        >
          <PlusIcon className='-ml-1 mr-2 h-5 w-5' aria-hidden='true' />
          Criar sua Loja
        </Link>
      )}
    </div>
  )
}

export default StoreDetails
