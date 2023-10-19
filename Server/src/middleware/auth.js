import JWT from 'jsonwebtoken'
import { findActiveUserById } from '../models/user.js'
import { Auth } from '../config.js'

export const addUserMiddleware = async (req, res, next) => {
    const bearerToken = req.headers?.authorization?.split(' ')[1]
    if (!bearerToken) {
        return res.status(401).json({
            error: 'unauthorized request',
        })
    }

    const decodedValue = JWT.decode(bearerToken)
    if (!decodedValue) {
        return res.status(401).json({
            error: 'unauthorized request',
        })
    }
    const userId = decodedValue.userId
    const user = await findActiveUserById(userId)

    if (!user) {
        return res.status(401).json({
            error: 'unauthorized request',
        })
    }

    try {
        JWT.verify(bearerToken, `${Auth.SECRET}.${user.salt}`)
    } catch (e) {
        return res.status(401).json({
            error: 'unauthorized request',
        })
    }

    req.user = user
    next()
}

export const checkForEmailVerfification = (req, res, next) => {
    const user = req.user

    if (!user.isEmailVerified) {
        return res.status(400).json({
            message: 'email not verified',
        })
    }

    next()
}
