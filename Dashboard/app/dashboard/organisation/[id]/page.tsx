import { NextPage } from 'next'

type PagePropsType = {
    params: {
        id: number
    }
}

const Organisation: NextPage<PagePropsType> = ({ params: { id } }) => <div>{id}</div>

export default Organisation
