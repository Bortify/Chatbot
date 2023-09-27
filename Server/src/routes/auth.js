import { Router } from 'express'
import {
  CreateAccount,
  SignIn,
  GetProfile,
  SendResetPasswordRequest,
  HandlePasswordResetRequest,
  SendEmailVerifyingRequest,
  HandleEmailVerifyingRequest,
  UpdateProfile,
  ArchiveUser,
} from '../controller/auth.js'
import { addUserMiddleware } from '../middleware/auth.js'

const authRouter = Router()

authRouter.post('/signup', CreateAccount)
authRouter.post('/signin', SignIn)

authRouter.post('/reset/send', SendResetPasswordRequest)
authRouter.post('/reset/handle', HandlePasswordResetRequest)

authRouter.get('/', addUserMiddleware, GetProfile)
authRouter.put('/', addUserMiddleware, UpdateProfile)
authRouter.delete('/', addUserMiddleware, ArchiveUser)

authRouter.post('/verify/handle', HandleEmailVerifyingRequest)
authRouter.post('/verify/send', addUserMiddleware, SendEmailVerifyingRequest)

export default authRouter
