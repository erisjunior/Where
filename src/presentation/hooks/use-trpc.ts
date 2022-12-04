import { trpcNext } from '~/server'

export const {
  signUp: { useMutation: useSignUpMutation }
} = trpcNext
