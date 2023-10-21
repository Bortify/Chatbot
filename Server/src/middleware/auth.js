import JWT from 'jsonwebtoken'
import { findActiveUserById } from '../models/user.js'
import { Auth } from '../config.js'

export const addUserMiddleware = async (req, res, next) => {
    const bearerToken = req.headers?.authorization?.split(' ')[1]
    if (!bearerToken) {
        return res.status(401).json({
            errors: [
                {
                    message: 'unauthorized request',
                    path: ['auth'],
                },
            ],
        })
    }

    const decodedValue = JWT.decode(bearerToken)
    if (!decodedValue) {
        return res.status(401).json({
            errors: [
                {
                    message: 'unauthorized request',
                    path: ['auth'],
                },
            ],
        })
    }
    const userId = decodedValue.userId
    const user = await findActiveUserById(userId)

    if (!user) {
        return res.status(401).json({
            errors: [
                {
                    message: 'unauthorized request',
                    path: ['auth'],
                },
            ],
        })
    }

    try {
        JWT.verify(bearerToken, `${Auth.SECRET}.${user.salt}`)
    } catch (e) {
        return res.status(401).json({
            errors: [
                {
                    message: 'unauthorized request',
                    path: ['auth'],
                },
            ],
        })
    }

    req.user = user
    next()
}

export const checkForEmailVerfification = (req, res, next) => {
    const user = req.user

    if (!user.isEmailVerified) {
        return res.status(409).json({
            errors: [
                {
                    message: 'email not verified',
                    path: ['auth'],
                },
            ],
        })
    }

    next()
}
