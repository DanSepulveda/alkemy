import { useEffect, useState } from 'react'
import message from '../utils/message'
import Table from './Table'
import Loader from './Loader'
import Balance from './Balance'
import transactionsActions from '../redux/actions/transactionsActions'
import { connect } from 'react-redux'

const Resume = ({ token, getResume }) => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        try {
            const response = await getResume(token)
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
        fetchData()
    }, [])

    if (loading) {
        return <Loader />
    }

    return (
        <section>
            <Balance />
            <Table
                transactions={data.top10}
                title={`Últimos ${data.top10.length} registros`}
                setData={setData}
            />
        </section>
    )
}

const mapStateToProps = state => {
    return {
        token: state.users.token
    }
}

const mapDispatchToProps = {
    getResume: transactionsActions.getResume
}

export default connect(mapStateToProps, mapDispatchToProps)(Resume)