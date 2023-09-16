import { Router } from "express";
import dashboardRouter from "./dashboard/index.js";

const appRouter = Router()

appRouter.use('/dashboard',dashboardRouter)

export default appRouter