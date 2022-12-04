import { useContext } from 'react'

import { InfiniteScrollContext } from '~/presentation/contexts'

export const useInfiniteScrollContext = () => {
  const context = useContext(InfiniteScrollContext)

  if (context) return context

  return {
    handleSetElement: () => {},
    setAction: () => {}
  }
}
