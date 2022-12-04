import '@fontsource/poppins'
import type { AppProps } from 'next/app'

import { ProviderComposition } from '~/presentation/providers'
import { trpcNext } from '~/server'
import '~/presentation/styles/globals.css'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ProviderComposition session={pageProps.session}>
      <Component {...pageProps} />
    </ProviderComposition>
  )
}

export default trpcNext.withTRPC(App)
