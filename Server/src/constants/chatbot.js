export const Configuration = {
    errorText: `Sorry, I can't help with that.`,
    maxUserMsgAllowed: 10,
    greetingMessage: `Hello, How can i help you?`,
    limitExceedText: `You can't message more than the limit.`,
    thinkingText: 'Bot is thinking',
    placeholder: 'Type your message here',
    style: {
        color: {
            icon: {
                background: '#2F2B54',
                text: '#FFFFFF',
            },
            header: {
                background: '#2F2B54',
                text: '#FFFFFF',
            },
            typingArea: {
                background: '#FFFFFF',
                text: '#94A3B8',
            },
            sendButton: {
                background: '#2F2B54',
                text: '#FFFFFF',
            },
            message: {
                user: {
                    background: '#3E3A64',
                    text: '#FFFFFF',
                },
                machine: {
                    background: '#FFFFFF',
                    text: '#3E3A64',
                },
            },
            thinkingContainer: {
                text: '#000000',
            },
            body: '#F5F6F8',
        },
        iconPosition: {
            right: 40,
            bottom: 32,
        },
    },
    initialPrompts: [
        {
            label: 'What is this?',
            message: 'What is this chatbot is all about?',
        },
    ],
}
