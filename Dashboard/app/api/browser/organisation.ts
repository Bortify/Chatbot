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

export const getOrganisation = (orgId: number) => {
  return browserApi(`/api/organisation/${orgId}`, {
    method: 'GET',
    body: null,
  })
}

export const updateOrganisation = (orgId: number, payload: Object) => {
  return browserApi(`/api/organisation/${orgId}`, {
    method: 'PUT',
    body: payload,
  })
}
