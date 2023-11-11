export type ChatbotConfiguration = {
  errorText: string
  maxUserMsgAllowed: number
  greetingMessage: string
  limitExceedText: number
  thinkingText: string
  placeholder: string
  style: {
    color: {
      icon: {
        background: string
        text: string
      }
      typingArea: {
        background: string
        text: string
      }
      sendButton: {
        background: string
        text: string
      }
      header: {
        background: string
        text: string
      }
      message: {
        user: {
          background: string
          text: string
        }
        machine: {
          background: string
          text: string
        }
      }
      thinkingContainer: {
        text: string
      }
      body: string
    }
    iconPosition: {
      right: string
      bottom: string
    }
  }
  initialPrompts: Array<{
    label: string
    message: string
  }>
}
