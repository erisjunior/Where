import Head from 'next/head'

import { DefaultLayout } from '~/presentation/layouts'

type Props = {
  children: React.ReactNode
}

const ProviderComposition = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title>Reopen</title>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <DefaultLayout>{children}</DefaultLayout>
    </>
  )
}

export default ProviderComposition
