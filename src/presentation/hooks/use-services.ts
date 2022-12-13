import { trpcNext } from '~/application/config/trpc-next'

export const {
  signUp: { useMutation: useSignUpMutation },

  createAddress: { useMutation: useCreateAddressMutation },

  createAnswer: { useMutation: useCreateAnswerMutation },

  upsertCall: { useMutation: useUpsertCallMutation },
  getCalls: { useQuery: useGetCallsQuery },
  getCall: { useQuery: useGetCallQuery },

  upsertCategory: { useMutation: useUpsertCategoryMutation },
  getCategories: { useQuery: useGetCategoriesQuery },

  createStore: { useMutation: useCreateStoreMutation },
  getStore: { useQuery: useGetStoreQuery }
} = trpcNext
