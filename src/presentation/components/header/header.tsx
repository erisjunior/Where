import { memo } from 'react'

type Props = {
  variant?: 'borderless' | 'filled' | 'ghost'
  color?: 'primary' | 'destructive'
}

export const Header = memo(({ ...props }: Props) => {
  return <div {...props} />
})

Header.displayName = 'Header'
