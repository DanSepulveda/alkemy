import { useEffect, useState } from 'react'
import message from '../utils/message'
import Table from './Table'
import Loader from './Loader'
import Balance from './Balance'
import transactionsActions from '../redux/actions/transactionsActions'
import { connect } from 'react-redux'

const Resume = ({ token, getResume, top10 }) => {
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        try {
            const response = await getResume(token)
            if (response.success) {
                setLoading(false)
            } else {
                throw new Error
            }
        } catch (error) {
            message('error', 'Ha ocurrido un problema. Intente más tarde.')
        }
    }

    let title
    if (top10?.length === 1) {
        title = 'Único registro'
    } else if (top10?.length > 1) {
        title = `Últimos ${top10.length} registros`
    } else {
        title = 'No existen movimientos'
    }

    useEffect(() => {
        if (!top10?.length) {
            fetchData()
        } else {
            setLoading(false)
        }
    }, [])

    if (loading) {
        return <Loader />
    }

    return (
        <section>
            <Balance />
            <Table
                transactions={top10}
                title={title}
            />
        </section>
    )
}

const mapStateToProps = state => {
    return {
        token: state.users.token,
        top10: state.transactions.top10
    }
}

const mapDispatchToProps = {
    getResume: transactionsActions.getResume
}

export default connect(mapStateToProps, mapDispatchToProps)(Resume)