export type InfiniteScrollContextProps = {
  handleSetElement: (newElement: HTMLDivElement | HTMLElement) => false | void
  setAction: (callback: () => void) => void
}
