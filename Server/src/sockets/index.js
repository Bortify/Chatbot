import { Chatbot } from '../logic/index.js'

const getOnSocketConnection = (io) => (socket) => {
    const { chatId } = socket.handshake.auth
    const { chatbot } = socket

    const userChannelId = `${chatId}-user`
    const statusChannelId = `${chatId}-status`
    const client = new Chatbot({
        indexName: chatbot.knowledgeBase.indexName,
        chatbot,
        conversationId: chatId,
    })

    console.log('chatbot connected with name', chatId)

    socket.join(userChannelId)
    socket.join(statusChannelId)

    socket.on('message', async (data) => {
        io.to(statusChannelId).emit('status', {
            status: 'PROCESSING',
            agent: 'MACHINE',
        })

        try {
            const ans = await client.predict(data.message)
            console.log('bot says', ans)
            io.to(userChannelId).emit('message', {
                message: ans,
            })
        } catch (e) {
            console.error(e)
        } finally {
            io.to(statusChannelId).emit('status', {
                status: 'IDLE',
                agent: 'MACHINE',
            })
        }
    })

    socket.on('disconnect', async () => {
        await client.cleanup()
        console.log('disconnected')
    })
}

export default getOnSocketConnection
