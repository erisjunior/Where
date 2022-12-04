import { Header } from '~/presentation/components'

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  )
}
export default DefaultLayout
