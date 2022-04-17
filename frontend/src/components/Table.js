import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Filters from './Filters'
import NewForm from './NewForm'
import Row from './Row'

const Table = ({ transactions, title }) => {
    const path = useLocation().pathname
    const [form, setForm] = useState({ open: false, editMode: false, data: null })

    return (
        <section className='flex-column'>
            {form.open && <NewForm setForm={setForm} editMode={form.editMode} transaction={form.data} />}
            {path === '/details'
                ? <div className='new-transaction flex-cc'>
                    <button onClick={() => setForm({ open: true, editMode: false, data: null })} >
                        Nueva transacción
                    </button>
                </div>
                : null
            }
            <h1>{title}</h1>
            {path === '/details' && <Filters />}
            {!transactions.length && path === '/'
                ? <div className='flex-cc'>
                    <Link to='/details' className='create'>
                        Ir a crear
                        <i class='fas fa-arrow-right'></i>
                    </Link>
                </div>
                : null
            }
            {transactions.map(transaction =>
                <Row
                    key={transaction.id}
                    transaction={transaction}
                    setForm={setForm}
                />
            )}
        </section>
    )
}

export default Table