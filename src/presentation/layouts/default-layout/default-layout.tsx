import { Header } from '../../components'
import { Root } from './default-layout-styles'

const DefaultLayout = ({ children }) => {
  return (
    <Root>
      <Header />
      <main>{children}</main>
    </Root>
  )
}
export default DefaultLayout