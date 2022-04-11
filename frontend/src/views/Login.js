import { NavLink } from 'react-router-dom'
import SignForm from '../components/SignForm'
import { useLocation } from 'react-router-dom'

const Login = () => {
    const pathname = useLocation().pathname

    return (
        <section className='login-container flex-cc'>
            <div className='box flex-column'>
                <div className='buttons flex-cc'>
                    <NavLink to='/login'>Ingresar</NavLink>
                    <NavLink to='/signup'>Crear cuenta</NavLink>
                </div>
                <h1>
                    {pathname === '/login' ? 'Ingresar a la cuenta' : 'Nuevo registro'}
                </h1>
                <div className='form'>
                    <SignForm />
                </div>
            </div>
        </section>
    )
}

export default Login