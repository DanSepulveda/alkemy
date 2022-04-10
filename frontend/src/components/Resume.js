import { useEffect, useState } from 'react'
import message from '../utils/message'
import transactionsActions from '../utils/transactionsActions'
import Loader from './Loader'

const Resume = ({ user }) => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)

    const getResume = async () => {
        try {
            const response = await transactionsActions.getResume(user.token)
            if (response.success) {
                setData(response.response)
                // setLoading(false)
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
            {console.log(data)}
        </section>
    )
}

export default Resume