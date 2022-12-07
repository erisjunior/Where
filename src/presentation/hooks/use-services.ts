import { trpcNext } from '~/application/config/trpc-next'

export const {
  signUp: { useMutation: useSignUpMutation },
  createAddress: { useMutation: useCreateAddressMutation }
} = trpcNext
