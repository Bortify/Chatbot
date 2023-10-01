import { getMessages } from "../models/conversation.js"

export const GetAllMessages = async (req,res)=>{
    const conversationId = req.conversation.id
    let messages = await getMessages(conversationId)
    messages = messages || []
    return res.status(200).json(messages)
}