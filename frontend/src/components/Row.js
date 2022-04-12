import message from '../utils/message'
import formatter from '../utils/formatMoney'
import transactionsActions from '../redux/actions/transactionsActions'
import { connect } from 'react-redux'
import confirmation from '../utils/confirmation'
import Cell from './Cell'
import ToolCell from './ToolCell'

const Row = ({ transaction, deleteTransaction, token }) => {
    const { id, date, type, name, image, description, amount } = transaction

    const icon = type === 'expense' ? 'arrow-down' : 'arrow-up'

    const deleteRow = async () => {
        try {
            const response = await deleteTransaction(id, token)
            if (response.success) {
                message('success', 'd')
            } else {
                throw new Error()
            }
        } catch (error) {
            message('error', 'Ha ocurrido un problema. Intente más tarde.')
        }
    }

    return (
        <div className='row'>
            <Cell title='Fecha' data={(new Date(date)).toLocaleDateString()} />
            <ToolCell title={'Tipo'} icon={icon} name={type.toUpperCase()} />
            <ToolCell title={'Categoría'} icon={image} name={name.toUpperCase()} />
            <Cell title={'Description'} data={description} />
            <Cell title={'Monto'} data={formatter.format(amount)} />
            <div className='flex-column-center'>
                <span className='title'>Acciones</span>
                <div className='flex-cc row-icons'>
                    <ToolCell
                        icon={'edit'}
                        name={'Editar'}
                    />
                    <ToolCell
                        icon={'trash-alt'}
                        name={'Borrar'}
                        fx={() => confirmation('¿Desea eliminar el registro?', 'Eliminar', null, deleteRow)}
                    />
                </div>
            </div>
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