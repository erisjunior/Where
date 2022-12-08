export enum Routes {
  HOME = '/',
  CALLS = '/calls',
  CALL = '/call/:id',
  CREATE_CALL = '/create-call',
  STORE = '/store',
  CREATE_STORE = '/create-store',
  LOGIN = '/login',
  REGISTER = '/register',
  NOT_FOUND = '/not-found'
}

export const routesDefinitions = [
  { name: 'Home', path: Routes.HOME },
  { name: 'Chamados', path: Routes.CALLS, private: true }
  // { name: 'Loja', path: Routes.STORE, private: true }
]

export const generatePath = (
  route: Routes,
  path: { [key: string]: string }
) => {
  const param = Object.keys(path)[0]
  const generatedRoute = route.replace(`:${param}`, path[param])
  return generatedRoute
}
