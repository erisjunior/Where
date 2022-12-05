import { z } from 'zod'

export enum HttpStatusCode {
  ok = 200,
  created = 201,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  formError = 421,
  unprocessableEntity = 422,
  serverError = 500
}

export const responseSchema = z.object({
  status: z.nativeEnum(HttpStatusCode),
  message: z.string(),
  data: z.any()
})

export type Response = z.infer<typeof responseSchema> & {
  data: any
}
export type ResponseParams = Omit<Response, 'status'>

export enum CommonErrorMessages {
  UNEXPECTED = 'An enexpected error ocurred',
  FORBIDDEN = 'You are not allowed to run this request',
  NOT_FOUND = 'Request not found',
  UNAUTHORIZED = 'You must be logged in to run this request'
}
