import { useLocation } from 'react-router-dom'
import Filters from './Filters'
import Row from './Row'

const Table = ({ transactions, title }) => {
    const path = useLocation().pathname

    return (
        <section className='flex-column table'>
            <h1>{title}</h1>
            {path === '/details' && <Filters />}
            {transactions.map(transaction =>
                <Row
                    key={transaction.id}
                    transaction={transaction}
                />
            )}
        </section>
    )
}

export default Table