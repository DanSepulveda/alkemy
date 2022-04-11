import { useEffect, useState } from 'react'
import message from '../utils/message'
import Table from './Table'
import Loader from './Loader'
import Balance from './Balance'
import transactionsActions from '../utils/transactionsActions'

const Resume = ({ user }) => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)

    const getResume = async () => {
        try {
            const response = await transactionsActions.getResume(user.token)
            if (response.success) {
                setData(response.response)
                setLoading(false)
            } else {
                throw new Error
            }
        } catch (error) {
            message('error', 'Ha ocurrido un problema. Intente más tarde.')
        }
    }

    useEffect(() => {
        getResume()
    }, [])

    if (loading) {
        return <Loader />
    }

    return (
        <section>
            <Balance data={data.resume[0]} />
            <Table
                transactions={data.top10}
                title={`Últimos ${data.top10.length} registros`}
                setData={setData}
                token={user.token}
            />
        </section>
    )
}

export default Resume