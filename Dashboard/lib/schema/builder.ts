import { z } from "zod";

export const builderFormSchema = z.object({
    errorText: z.string(),
    maxUserMsgAllowed: z.number(),
    greetingMessage: z.string(),
    limitExceedText: z.string(),
    thinkingText: z.string(),
    placeholder: z.string(),
    style: z.object({
      color: z.object({
        icon: z.object({
          background: z.string(),
          text: z.string(),
        }),
        typingArea: z.object({
          background: z.string(),
          text: z.string(),
        }),
        sendButton: z.object({
          background: z.string(),
          text: z.string(),
        }),
        header: z.object({
          background: z.string(),
          text: z.string(),
        }),
        message: z.object({
          user: z.object({
            background: z.string(),
            text: z.string(),
          }),
          machine: z.object({
            background: z.string(),
            text: z.string(),
          }),
        }),
        thinkingContainer: z.object({
          text: z.string(),
        }),
        body: z.string(),
      }),
      iconPosition: z.object({
        right: z.number(),
        bottom: z.number(),
      }),
    }),
    initialPrompts: z.array(
      z.object({
        label: z.string(),
        message: z.string(),
      })
    ),
  })