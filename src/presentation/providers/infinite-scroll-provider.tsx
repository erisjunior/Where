import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { InfiniteScrollContext } from '~/presentation/contexts'

type Props = {
  children: React.ReactNode
  action?: () => void
  options?: IntersectionObserverInit
}
const InfiniteScrollProvider = ({
  action = () => null,
  options,
  children
}: Props) => {
  const actionState = useRef(action)
  const [element, setElement] = useState<HTMLDivElement | HTMLElement>()

  const optionsConfig: IntersectionObserverInit = useMemo(
    () =>
      options ?? {
        root: null,
        rootMargin: '0px 0px 160px 0px',
        threshold: 0
      },
    [options]
  )

  const handleSetElement = useCallback(
    (newElement: HTMLDivElement | HTMLElement) =>
      newElement !== element && setElement(newElement),
    [element]
  )

  const setAction = useCallback((callback: () => void) => {
    actionState.current = callback
  }, [])

  useEffect(() => {
    if (action) setAction(action)
  }, [action])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        return entry.isIntersecting && actionState.current()
      })
    }, optionsConfig)

    if (element) {
      observer.observe(element)
    }

    return () => element && observer.unobserve(element)
  }, [element, optionsConfig])

  const consumables = useMemo(
    () => ({
      handleSetElement,
      setAction
    }),
    [handleSetElement, setAction]
  )

  return (
    <InfiniteScrollContext.Provider value={consumables}>
      {children}
    </InfiniteScrollContext.Provider>
  )
}

export default InfiniteScrollProvider
