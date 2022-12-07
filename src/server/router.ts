import * as addressServices from '~/application/services/address'
import * as storeServices from '~/application/services/store'
import * as userServices from '~/application/services/user'
import { router } from '~/server'

export const serverRouter = router({
  ...addressServices,
  ...storeServices,
  ...userServices
})

export type ServerRouter = typeof serverRouter
