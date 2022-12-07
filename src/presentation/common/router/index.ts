export enum Routes {
  HOME = '/',
  DASHBOARD = '/dashboard',
  LOGIN = '/login',
  REGISTER = '/register',
  NOT_FOUND = '/not-found'
}

export const routesDefinitions = [
  { name: 'Home', path: Routes.HOME },
  { name: 'Dashboard', path: Routes.DASHBOARD, private: true }
]

export const generatePath = (
  route: Routes,
  path: { [key: string]: string }
) => {
  const param = Object.keys(path)[0]
  const generatedRoute = route.replace(`:${param}`, path[param])
  return generatedRoute
}
