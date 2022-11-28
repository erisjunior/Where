import '@fontsource/poppins'
import type { AppType } from 'next/app'

import { ProviderComposition } from '~/presentation/providers'
import '~/presentation/styles/globals.css'
import { trpcNext } from '~/server'

const App: AppType = ({ Component, pageProps }) => {
  return (
    <ProviderComposition>
      <Component {...pageProps} />
    </ProviderComposition>
  )
}

export default trpcNext.withTRPC(App)
