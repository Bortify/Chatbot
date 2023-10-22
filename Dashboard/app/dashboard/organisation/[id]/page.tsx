import Organisation from '@/containers/Organisation'
import { NextPage } from 'next'

type PagePropsType = {
  params: {
    id: number
  }
}

const OrganisationPage: NextPage<PagePropsType> = ({ params: { id } }) => (
  <Organisation orgId={id} />
)

export default OrganisationPage
