import { useEffect, useState } from 'react'
import Table from './Table'
import Loader from './Loader'
import message from '../utils/message'
import transactionsActions from '../redux/actions/transactionsActions'
import { connect } from 'react-redux'

const Transactions = ({ token, getTransactions, transactions }) => {
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        try {
            const response = await getTransactions(token)
            if (response.success) {
                setLoading(false)
            } else {
                throw new Error
            }
        } catch (error) {
            message('error', 'Ha ocurrido un problema. Intente más tarde.')
        }
    }

    useEffect(() => {
        if (!transactions?.length) {
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
            <Table
                transactions={transactions}
                title='Historial de movimientos'
            />
        </section>
    )
}

const mapStateToProps = state => {
    return {
        token: state.users.token,
        transactions: state.transactions.allTransactions
    }
}

const mapDispatchToProps = {
    getTransactions: transactionsActions.getTransactionsByUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)