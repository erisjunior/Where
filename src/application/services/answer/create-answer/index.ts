import { conflictError } from '~/application/common/exceptions'
import { createdResponse, responseSchema } from '~/application/common/responses'
import { Answer } from '~/application/models'
import { protectedProcedure } from '~/server'

export const createAnswer = protectedProcedure
  .input(Answer.createAnswerSchema)
  .output(responseSchema.extend({ data: Answer.schema }))
  .mutation(async ({ input, ctx }) => {
    const exists = await ctx.prisma.answer.findFirst({
      where: {
        AND: [{ callId: input.callId }, { storeId: input.storeId }]
      }
    })

    if (exists) {
      throw conflictError(Answer.Messages.CONFLICT)
    }

    const response = await ctx.prisma.answer.create({
      data: {
        message: input.message,
        call: {
          connect: { id: input.callId }
        },
        store: {
          connect: { id: input.storeId }
        }
      }
    })

    return createdResponse({
      message: Answer.Messages.CREATED,
      data: response
    })
  })
