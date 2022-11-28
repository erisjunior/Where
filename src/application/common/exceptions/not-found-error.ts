export class NotFoundError extends Error {
  constructor(message?: string) {
    super('NotFoundError')
    this.name = 'NotFoundError'
    this.message = message ?? 'exceptions:NOT_FOUND'
  }
}
