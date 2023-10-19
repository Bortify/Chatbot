import { createClient } from 'redis'

import { Redis } from '../config.js'

const redisClient = createClient({
    url: `redis://${Redis.USERNAME}:${Redis.PASSWORD}@${Redis.URL}`,
})

await redisClient.connect()

export const setDataInCache = (key, value) => {
    return redisClient.set(key, JSON.stringify(value))
}

export const getDataFromCache = async (key) => {
    const data = await redisClient.get(key)
    return JSON.parse(data)
}

export const deleteDataFromCache = async (...keys) => {
    return redisClient.del(keys)
}

export default redisClient
