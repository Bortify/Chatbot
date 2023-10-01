import { Router } from "express";

import { GetAllMessages } from "../controller/messages.js";

const messageRouter = Router()

messageRouter.get('/messages',GetAllMessages)

export default messageRouter