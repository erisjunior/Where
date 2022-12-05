import { ResponseParams, Response, HttpStatusCode } from './'

export const createdResponse = (request: ResponseParams): Response => {
  return {
    status: HttpStatusCode.created,
    message: request.message,
    data: request.data
  }
}
