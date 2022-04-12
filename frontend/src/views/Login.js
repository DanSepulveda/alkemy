import { NavLink } from 'react-router-dom'
import SignForm from '../components/SignForm'
import { useLocation } from 'react-router-dom'
import MainSection from '../components/MainSection'

const Login = () => {
    const path = useLocation().pathname

    const title = path === '/login'
        ? 'Ingresar a la cuenta'
        : 'Nuevo registro'

    return (
        <MainSection>
            <section className='login-container flex-cc bg-main'>
                <div className='box flex-column bg-secondary bradius5'>
                    <div className='buttons flex-cc'>
                        <NavLink to='/login'>Ingresar</NavLink>
                        <NavLink to='/signup'>Crear cuenta</NavLink>
                    </div>
                    <h1>{title}</h1>
                    <SignForm />
                </div>
            </section>
        </MainSection>
    )
}

export default Login