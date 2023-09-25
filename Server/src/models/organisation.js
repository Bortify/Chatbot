import { prisma } from './index.js'

export const createOrganisation = (userId, data) =>
  prisma.organisation.create({
    data: {
      userId,
      ...data,
    },
  })

export const updateOrganisation = (orgId, data, filter = {}) =>
  prisma.organisation.update({
    where: {
      id: orgId,
      ...filter,
    },
    data,
  })

export const findOrganisation = (orgId, userId, filter = {}) =>
  prisma.organisation.findFirst({
    where: {
      id: orgId,
      userId,
      ...filter,
    },
  })
