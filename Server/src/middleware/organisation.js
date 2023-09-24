import { findOrganisation } from '../models/organisation.js'

export const attachOrganisationMiddleware = async (req, res, next) => {
  let orgId = null

  try {
    orgId = parseInt(req.params.orgId)
  } catch (e) {
    return res.status(400).json({
      error: 'invalid id',
    })
  }

  const organisation = await findOrganisation(orgId, req.user.id, {
    archived: false,
  })

  if (!organisation) {
    return res.status(404).json({
      error: 'organisation not found',
    })
  }

  req.organisation = organisation
  next()
}
