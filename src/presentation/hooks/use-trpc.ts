import { trpcNext } from '~/server'

export const {
  createUser: { useMutation: useCreateUserMutation }
} = trpcNext
