import { trpcNext } from '~/application/config/trpc-next'

export const {
  signUp: { useMutation: useSignUpMutation },
  createAddress: { useMutation: useCreateAddressMutation },
  createAnswer: { useMutation: usecrCateAnswerMutation },
  createCall: { useMutation: useCreateCallMutation },
  getCalls: { useQuery: useGetCallsQuery },
  createStore: { useMutation: usecCeateStoreMutation }
} = trpcNext
