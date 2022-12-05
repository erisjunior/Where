import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'

import { DefaultLayout } from '~/presentation/layouts'

import ColorModeProvider from './color-mode-provider'

type Props = {
  children: React.ReactNode
  session: any
}

const ProviderComposition = ({ children, session }: Props) => {
  return (
    <>
      <Head>
        <title>Reopen</title>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <meta name='description' content='Where' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <SessionProvider session={session}>
        <ColorModeProvider>
          <DefaultLayout>{children}</DefaultLayout>
        </ColorModeProvider>
      </SessionProvider>
    </>
  )
}

export default ProviderComposition
