import Organisation from '@/containers/Organisation'
import { NextPage } from 'next'

type PagePropsType = {
  params: {
    orgId: number
  }
}

const OrganisationPage: NextPage<PagePropsType> = ({ params: { orgId } }) => (
  <Organisation orgId={orgId} />
)

export default OrganisationPage
