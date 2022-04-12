import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Filters from './Filters'
import NewForm from './NewForm'
import Row from './Row'

const Table = ({ transactions, title }) => {
    const path = useLocation().pathname
    const [form, setForm] = useState(false)

    return (
        <section className='flex-column'>
            {form && <NewForm setForm={setForm} />}
            <h1>{title}</h1>
            {path === '/details' && transactions.length ? <Filters /> : null}
            {!transactions.length
                ? <div className='flex-cc'>
                    <i className='fas fa-plus-circle' onClick={() => setForm(true)}></i>
                </div>
                : null
            }
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