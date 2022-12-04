import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'

import { DefaultLayout } from '~/presentation/layouts'

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
      </Head>
      <SessionProvider session={session}>
        <DefaultLayout>{children}</DefaultLayout>
      </SessionProvider>
    </>
  )
}

export default ProviderComposition
