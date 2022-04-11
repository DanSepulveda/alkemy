import Swal from 'sweetalert2'
import message from '../utils/message'
import userActions from '../redux/actions/usersActions'
import { connect } from 'react-redux'

const NavBox = ({ id, token, email, logout, deleteUser }) => {
    const closeSession = () => {
        Swal.fire({
            text: '¿Desea cerrar sesión?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Cerrar sesión',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                logout()
                Swal.fire(
                    '',
                    'Sesión cerrada correctamente',
                    'success'
                )
            }
        })
    }

    const deleteAccount = async (password) => {
        try {
            const response = await deleteUser(id, token, password)
            if (response.success) {
                message('success', 'Cuenta borrada exitosamente')
            } else {
                message('error', response.error)
            }
        } catch (error) {
            message('error', 'Ha ocurrido un problema. Intente más tarde.')
        }
    }

    const confirmation = () => {
        Swal.fire({
            title: '¿Está seguro/a?',
            text: 'Se borrará su cuenta y todos sus datos. Esta acción no se puede revertir.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { value: password } = await Swal.fire({
                    title: 'Confirmar contraseña',
                    showCancelButton: true,
                    cancelButtonText: 'Cancelar',
                    input: 'password',
                    inputLabel: '',
                    inputPlaceholder: '',
                    inputAttributes: {
                        autocapitalize: 'off',
                        autocorrect: 'off'
                    }
                })
                if (password) {
                    deleteAccount(password)
                }
            }
        })
    }

    return (
        <div className='navbox flex-column'>
            <p className='email'>{email}</p>
            <p className='delete' onClick={confirmation}>Borrar cuenta</p>
            <p className='close' onClick={closeSession}>Cerrar sesión</p>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        email: state.users.email,
        id: state.users.id,
        token: state.users.token
    }
}

const mapDispatchToProps = {
    logout: userActions.logout,
    deleteUser: userActions.deleteAccout
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBox)