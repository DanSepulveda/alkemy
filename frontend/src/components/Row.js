import message from '../utils/message'
import formatter from '../utils/formatMoney'
import transactionsActions from '../redux/actions/transactionsActions'
import { connect } from 'react-redux'
import confirmation from '../utils/confirmation'
import Cell from './Cell'
import ToolCell from './ToolCell'
import { useLocation } from 'react-router-dom'
import formatDate from '../utils/formatDate'

const Row = ({ transaction, deleteTransaction, token, setForm }) => {
    const { id, date, type, name, image, description, amount } = transaction
    const path = useLocation().pathname

    const icon = type === 'expense' ? 'arrow-down' : 'arrow-up'

    const deleteRow = async () => {
        try {
            const response = await deleteTransaction(id, token)
            if (response.success) {
                message('success', response.response)
            } else {
                throw new Error()
            }
        } catch (error) {
            message('error', 'Ha ocurrido un problema. Intente más tarde.')
        }
    }

    return (
        <div className='row'>
            <Cell title='Fecha' data={formatDate(date)} selector='date' />
            <ToolCell title='Tipo' icon={icon} name={type === 'income' ? 'ingreso' : 'gasto'} selector='type' />
            <ToolCell title='Categoría' icon={image} name={name} selector='category' />
            <Cell title='Descripción' data={description} selector='description' />
            <Cell title='Monto' data={formatter.format(amount)} selector={type === 'expense' ? 'amount-expense' : 'amount-income'} />
            {path === '/details' && <div className='flex-column-center actions'>
                <span className='title'>Acciones</span>
                <div className='flex-cc row-icons'>
                    <ToolCell
                        icon={'edit'}
                        name={'Editar'}
                        fx={() => setForm({ open: true, editMode: true, data: transaction })}
                    />
                    <ToolCell
                        icon={'trash-alt'}
                        name={'Borrar'}
                        fx={() => confirmation('¿Desea eliminar el registro?', 'Eliminar', null, deleteRow)}
                    />
                </div>
            </div>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        token: state.users.token
    }
}

const mapDispatchToProps = {
    deleteTransaction: transactionsActions.deleteTransaction
}

export default connect(mapStateToProps, mapDispatchToProps)(Row)