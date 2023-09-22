import { Router } from "express";

import chatbotRouter from "./dashboard.js";

const appRouter = Router()

appRouter.use('/dashboard',chatbotRouter)

export default appRouter