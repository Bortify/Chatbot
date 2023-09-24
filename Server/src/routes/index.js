import { Router } from "express";

import chatbotRouter from "./dashboard.js";
import authRouter from "./auth.js";

const appRouter = Router()

// TODO (HITEN): Create Middleware to attach user and check if request coming for chatbot is valid or not.
appRouter.use('/dashboard',chatbotRouter)
appRouter.use('/auth',authRouter)

export default appRouter