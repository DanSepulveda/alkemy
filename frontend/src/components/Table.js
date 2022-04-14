import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Filters from './Filters'
import NewForm from './NewForm'
import Row from './Row'

const Table = ({ transactions, title }) => {
    const path = useLocation().pathname
    const [form, setForm] = useState(false)

    return (
        <section className='flex-column'>
            {form && <NewForm setForm={setForm} />}
            {path === '/details'
                ? <div className='new-transaction flex-cc'>
                    <button onClick={() => setForm(true)} >
                        Nueva transacción
                    </button>
                </div>
                : null
            }
            <h1>{title}</h1>
            {path === '/details' && transactions.length ? <Filters /> : null}
            {!transactions.length && path === '/'
                ? <div className='flex-cc'>
                    <Link to='/details' className='create'>
                        Ir a crear
                        <i class="fas fa-arrow-right"></i>
                    </Link>
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