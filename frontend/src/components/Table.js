import Row from './Row'

const Table = ({ transactions, title }) => {
    return (
        <section className='flex-column table'>
            <h1>{title}</h1>
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