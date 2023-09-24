import { prisma } from './index.js'

export const findActiveUserByEmail = (email) =>
  prisma.user.findFirst({
    where: {
      email,
      archived: false,
    },
  })

export const createUser = (data) =>
  prisma.user.create({
    data,
  })

export const findActiveUserById = (id) =>
  prisma.user.findFirst({
    where: {
      id,
      archived: false,
    },
  })

export const updateUserById = (id, data) =>
  prisma.user.update({
    where: {
      id,
    },
    data,
  })
