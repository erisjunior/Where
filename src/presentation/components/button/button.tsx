import { ButtonHTMLAttributes, DetailedHTMLProps, memo } from 'react'

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant: 'default'
  color: 'primary'
}

export const Button = memo(({ ...props }: Props) => {
  return <button {...props} />
})

Button.displayName = 'Button'
