import { Router } from 'express'
import {
  CreateAccount,
  SignIn,
  GetProfile,
  SendResetPasswordRequest,
  HandlePasswordResetRequest,
  SendEmailVerifyingRequest,
  HandleEmailVerifyingRequest,
} from '../controller/auth.js'
import { addUserMiddleware } from '../middleware/auth.js'

const authRouter = Router()

authRouter.post('/signup', CreateAccount)
authRouter.post('/signin', SignIn)
authRouter.post('/verify/handle', HandleEmailVerifyingRequest)

authRouter.post('/reset/send', SendResetPasswordRequest)
authRouter.post('/reset/handle', HandlePasswordResetRequest)

authRouter.get('/', addUserMiddleware, GetProfile)
authRouter.post('/verify/send', addUserMiddleware, SendEmailVerifyingRequest)

export default authRouter
