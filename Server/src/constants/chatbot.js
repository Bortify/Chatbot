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
                text: '#FFF',
            },
            header: {
                background: '#2F2B54',
                text: '#FFF',
            },
            typingArea: {
                background: '#FFF',
                text: '#94A3B8',
            },
            sendButton: {
                background: '#2F2B54',
                text: '#FFF',
            },
            message: {
                user: {
                    background: '#3E3A64',
                    text: '#FFF',
                },
                machine: {
                    background: '#FFF',
                    text: '#3E3A64',
                },
            },
            thinkingContainer: {
                text: 'red',
            },
            body: '#F5F6F8',
        },
        iconPosition: {
            right: '40px',
            bottom: '32px',
        },
    },
    initialPrompts: [
        {
            label: 'What is this?',
            message: 'What is this chatbot is all about?',
        },
    ],
}
