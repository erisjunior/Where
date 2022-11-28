export class AccessDeniedError extends Error {
  constructor(message?: string) {
    super('AccessDenied')
    this.name = 'AccessDenied'
    this.message = message ?? 'exceptions:ACCESS_DENIED'
  }
}
