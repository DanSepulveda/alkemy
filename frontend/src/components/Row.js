import message from '../utils/message'
import transactionsActions from '../utils/transactionsActions'
import Swal from 'sweetalert2'

const Row = ({ transaction, setData, token }) => {
    const { id, date, type, name, image, description, amount } = transaction

    const icon = type === 'expense' ? 'down' : 'up'

    const formatter = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
    })

    const deleteTransaction = async () => {
        try {
            const response = await transactionsActions.deleteTransaction(id, token)
            if (response.success) {
                message('success', 'Registro borrado correctamente')
            } else {
                throw new Error
            }
        } catch (error) {
            message('error', 'Ha ocurrido un problema. Intente más tarde.')
        }
    }

    const confirmation = () => {
        Swal.fire({
            text: '¿Desea eliminar el registro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteTransaction()
            }
        })
    }

    return (
        <div className='row'>
            <div className='flex-column-center' style={{ width: '15%' }}>
                <span className='title'>Fecha</span>
                <span>{(new Date(date)).toLocaleDateString()}</span>
            </div>
            <div className='flex-column-center' style={{ width: '5%' }}>
                <span className='title'>Tipo</span>
                <span className='icontool'>
                    <span><i className={`fas fa-arrow-${icon}`}></i></span>
                    <span className='tooltip'>{type.toUpperCase()}</span>
                </span>
            </div>
            <div className='flex-column-center' style={{ width: '10%' }}>
                <span className='title'>Categoría</span>
                <span className='icontool'>
                    <span><i className={`fas fa-${image}`}></i></span>
                    <span className='tooltip'>{name.toUpperCase()}</span>
                </span>
            </div>
            <div className='flex-column' style={{ width: '50%' }}>
                <span className='title'>Descripción</span>
                <span>{description}</span>
            </div>
            <div className='flex-column-center' style={{ width: '10%' }}>
                <span className='title'>Monto</span>
                <span>{formatter.format(amount)}</span>
            </div>
            <div className='flex-column-center' style={{ width: '10%' }}>
                <span className='title'>Acciones</span>
                <div>
                    <span className='icontool' style={{ 'marginRight': '10px' }}>
                        <span><i className='fas fa-edit'></i></span>
                        <span className='tooltip border'>Editar</span>
                    </span>
                    <span className='icontool'>
                        <span onClick={confirmation}><i className='fas fa-trash-alt'></i></span>
                        <span className='tooltip border'>Borrar</span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Row