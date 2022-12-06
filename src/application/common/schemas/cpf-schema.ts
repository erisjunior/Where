import { z } from 'zod'

import { validateCpf } from '~/application/common/validators'

export const cpfSchema = z
  .string()
  .length(11)
  .refine(validateCpf, { message: 'Invalid CPF.' })
