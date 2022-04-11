import { NavLink } from 'react-router-dom'
import SignForm from '../components/SignForm'

const Login = ({ tag }) => {
    return (
        <section className='login-container flex-cc'>
            <div className='box flex-column'>
                <div className='buttons flex-cc'>
                    <NavLink to='/login'>Ingresar</NavLink>
                    <NavLink to='/signup'>Crear cuenta</NavLink>
                </div>
                <h1>
                    {tag === 'login' ? 'Ingresar a la cuenta' : 'Nuevo registro'}
                </h1>
                <div className='form'>
                    <SignForm tag={tag} />
                </div>
            </div>
        </section>
    )
}

export default Login