import Row from './Row'

const Table = ({ transactions }) => {
    return (
        <section className='flex-column'>
            {transactions.map(transaction =>
                <Row transaction={transaction} key={transaction.id} />
            )}
        </section>
    )
}

export default Table