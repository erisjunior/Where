import { useCallback } from 'react'

import Image from 'next/image'

import { useCreateAnswerMutation, useGetCallsQuery } from '~/presentation/hooks'

const StoreCalls = ({
  category,
  storeId
}: {
  category: string
  storeId: string
}) => {
  const { data: calls } = useGetCallsQuery({ category })

  const { mutateAsync: createAnswer } = useCreateAnswerMutation()

  const handleCreateAnswer = useCallback(
    async (callId: string) => {
      try {
        await createAnswer({ message: '', callId, storeId })
      } catch (error) {}
    },
    [createAnswer, storeId]
  )

  return (
    <div className='grid mt-5 gap-2'>
      <span className='w-fit bg-indigo-100 text-indigo-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded'>
        {calls?.data.length ?? 0} Chamados abertos
      </span>
      {calls?.data.map((call) => (
        <div
          key={call.id}
          className='flex justify-between p-2 rounded'
          onClick={async () => handleCreateAnswer(call.id)}
        >
          <div className='flex items-center'>
            <Image
              className='h-10 w-10 rounded-full '
              src={call.image.image}
              alt='profile'
              width={40}
              height={40}
            />
            <div className='ml-2'>
              <p>{call.title}</p>
              <span className='text-xs'>{call.description}</span>
            </div>
          </div>
          <div className='inline-flex items-center rounded-md border border-transparent bg-indigo-600 p-1 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
            Responder chamado
          </div>
        </div>
      ))}
    </div>
  )
}

export default StoreCalls
