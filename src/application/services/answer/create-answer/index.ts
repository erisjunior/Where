import { conflictError } from '~/application/common/exceptions'
import { responseSchema, createdResponse } from '~/application/common/responses'
import {
  Answer,
  answerDefaultSchema,
  createAnswerSchema
} from '~/application/models'
import { protectedProcedure } from '~/server'

export const createAnswer = protectedProcedure
  .input(createAnswerSchema)
  .output(responseSchema.extend({ data: answerDefaultSchema }))
  .mutation(async ({ input, ctx }) => {
    const exists = await ctx.prisma.answer.findFirst({
      where: {
        AND: [{ callId: input.callId }, { storeId: input.storeId }]
      }
    })

    if (exists) {
      throw conflictError()
    }

    const response = await ctx.prisma.answer.create({
      data: {
        message: input.message,
        call: {
          connect: {
            id: input.callId
          }
        },
        store: {
          connect: {
            id: input.storeId
          }
        }
      }
    })

    return createdResponse({
      message: Answer.Messages.CREATED,
      data: response
    })
  })
