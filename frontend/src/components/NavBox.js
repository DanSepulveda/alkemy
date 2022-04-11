import Swal from 'sweetalert2'
import message from '../utils/message'
import userActions from '../redux/actions/usersActions'

const NavBox = ({ user, setUser }) => {
    const clearUser = () => {
        localStorage.removeItem('token')
        setUser({ id: null, username: null, email: null, token: null })
    }

    const logout = () => {
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
                clearUser()
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
            const response = await userActions.deleteAccout(user.id, user.token, password)
            if (response.success) {
                clearUser()
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
            <p className='email'>{user.email}</p>
            <p className='delete' onClick={confirmation}>Borrar cuenta</p>
            <p className='close' onClick={logout}>Cerrar sesión</p>
        </div>
    )
}

export default NavBox