import { NavLink } from 'react-router-dom'
import SignForm from '../components/SignForm'
import { useLocation } from 'react-router-dom'

const Login = () => {
    const path = useLocation().pathname

    const title = path === '/login'
        ? 'Ingresar a la cuenta'
        : 'Nuevo registro'

    return (
        <section className='login-container flex-cc'>
            <div className='box flex-column'>
                <div className='buttons flex-cc'>
                    <NavLink to='/login'>Ingresar</NavLink>
                    <NavLink to='/signup'>Crear cuenta</NavLink>
                </div>
                <h1>
                    {title}
                </h1>
                <div className='form'>
                    <SignForm />
                </div>
            </div>
        </section>
    )
}

export default Login