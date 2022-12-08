export enum Routes {
  HOME = '/',
  CALLS = '/calls',
  CREATE_CALL = '/create-call',
  LOGIN = '/login',
  REGISTER = '/register',
  NOT_FOUND = '/not-found'
}

export const routesDefinitions = [
  { name: 'Home', path: Routes.HOME },
  { name: 'Calls', path: Routes.CALLS, private: true }
]

export const generatePath = (
  route: Routes,
  path: { [key: string]: string }
) => {
  const param = Object.keys(path)[0]
  const generatedRoute = route.replace(`:${param}`, path[param])
  return generatedRoute
}
