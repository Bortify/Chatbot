import browserApi from '.'

export const listOrganisations = () => {
  return browserApi('/api/organisation', {
    method: 'GET',
    body: null,
  })
}

export const createOrganisation = (payload: object) => {
  return browserApi('/api/organisation', {
    method: 'POST',
    body: payload,
  })
}
