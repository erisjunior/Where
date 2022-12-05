import { ResponseParams, Response, HttpStatusCode } from './'

export const successResponse = (request: ResponseParams): Response => {
  return {
    status: HttpStatusCode.ok,
    message: request.message,
    data: request.data
  }
}
