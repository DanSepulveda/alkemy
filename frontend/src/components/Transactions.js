import { useEffect, useState } from 'react'
import Table from './Table'
import Loader from './Loader'
import message from '../utils/message'
import transactionsActions from '../redux/actions/transactionsActions'
import { connect } from 'react-redux'

const Transactions = ({ token, getTransactions, transactions, fetched }) => {
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        try {
            const response = await getTransactions(token)
            if (response.success) {
                setLoading(false)
            } else {
                throw new Error()
            }
        } catch (error) {
            message('error', 'Ha ocurrido un problema. Intente más tarde.')
        }
    }

    const title = transactions.length
        ? `Historial de movimientos (${transactions.length})`
        : 'No existen movimientos'

    useEffect(() => {
        if (!fetched) {
            fetchData()
        } else {
            setLoading(false)
        }
        //eslint-disable-next-line
    }, [])

    if (loading) {
        return <Loader />
    }

    return (
        <section className='results'>
            <Table
                transactions={transactions}
                title={title}
            />
        </section>
    )
}

const mapStateToProps = state => {
    return {
        token: state.users.token,
        transactions: state.transactions.allTransactions,
        fetched: state.transactions.allTransactionsFetched
    }
}

const mapDispatchToProps = {
    getTransactions: transactionsActions.getTransactionsByUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)