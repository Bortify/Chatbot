import {config} from 'dotenv'

config()

export const Server = {
    PORT: process.env.PORT || 8080
}

export const Environ = {
    ENVIRONMENT: process.env.NODE_ENV || 'development'
}