import { responseSchema, createdResponse } from '~/application/common/responses'
import { Answer, answerSchema } from '~/application/models'
import { protectedProcedure } from '~/server'

export const createAnswer = protectedProcedure
  .input(answerSchema)
  .output(responseSchema.extend({ data: answerSchema }))
  .mutation(async ({ input, ctx }) => {
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
            id: input.callId
          }
        }
      },
      include: Answer.prisma.includeStoreWithUser
    })

    return createdResponse({
      message: Answer.Messages.CREATED,
      data: response
    })
  })
