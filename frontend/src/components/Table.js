import Row from './Row'

const Table = ({ transactions, title, setData, token }) => {
    return (
        <section className='flex-column table'>
            <h1>{title}</h1>
            {transactions.map(transaction =>
                <Row
                    key={transaction.id}
                    transaction={transaction}
                    setData={setData}
                    token={token}
                />
            )}
        </section>
    )
}

export default Table