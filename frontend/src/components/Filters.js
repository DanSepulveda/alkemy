import { connect } from 'react-redux'
import { useRef, useState } from 'react'
import capitalize from '../utils/capitalize'
import transactionsActions from '../redux/actions/transactionsActions'

const Filters = ({ categories, filter }) => {
    const { income, expense } = categories
    const [type, setType] = useState()
    const typeRef = useRef()
    const catRef = useRef()
    const descRef = useRef()

    const handleChange = () => {
        filter({ type: typeRef.current.value, category: catRef.current.value, description: descRef.current.value })
    }

    let options
    switch (type) {
        case 'income':
            options = income
            break
        case 'expense':
            options = expense
            break
        default:
            options = (income.concat(expense)).sort()
            break
    }

    return (
        <section className='filters'>
            <div className='flex-cc'>
                <label htmlFor='type'>Tipo</label>
                <select name='type' id='type' onChange={(e) => {
                    handleChange(e)
                    setType(e.target.value)
                }} ref={typeRef}>
                    <option value=''>Ver Todo</option>
                    {income.length && <option value='income'>Ingresos</option>}
                    {expense.length && <option value='expense'>Gastos</option>}
                </select>
            </div>
            <div className='flex-cc'>
                <label htmlFor='category'>Categoría</label>
                <select name='category' id='category' onChange={(e) => handleChange(e)} ref={catRef}>
                    <option value=''>Ver todo</option>
                    {options.map(option => <option key={option} value={option}>{capitalize(option)}</option>)}
                </select>
            </div>
            <div className='flex-cc'>
                <label htmlFor='description'>Descripción</label>
                <input
                    type='text'
                    name='description'
                    id='description'
                    placeholder='Buscar por descripción'
                    ref={descRef}
                    onChange={(e) => handleChange(e)}
                />
            </div>
        </section>
    )
}

const mapStateToProps = state => {
    return {
        categories: state.transactions.categories
    }
}

const mapDispatchToProps = {
    filter: transactionsActions.filter
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)