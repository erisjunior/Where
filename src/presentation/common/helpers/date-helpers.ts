import { format } from 'date-fns'

export const formatDate = (
  date: number | Date,
  pattern: string = 'dd/MM/y'
): string => {
  return format(date, pattern)
}
