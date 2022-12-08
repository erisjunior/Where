import * as addressServices from '~/application/services/address'
import * as answerServices from '~/application/services/answer'
import * as callServices from '~/application/services/call'
import * as categoryServices from '~/application/services/category'
import * as storeServices from '~/application/services/store'
import * as userServices from '~/application/services/user'
import { router } from '~/server'

export const serverRouter = router({
  ...addressServices,
  ...answerServices,
  ...callServices,
  ...categoryServices,
  ...storeServices,
  ...userServices
})

export type ServerRouter = typeof serverRouter
