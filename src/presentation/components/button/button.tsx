import { ButtonHTMLAttributes, DetailedHTMLProps, memo } from 'react'

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {}

export const Button = memo((props: Props) => {
  return <button {...props} />
})

Button.displayName = 'Button'
