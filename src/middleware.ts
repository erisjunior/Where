export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/calls', '/create-call', '/call/:id', '/store', '/create-store']
}
