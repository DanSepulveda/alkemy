import { Link } from 'react-router-dom'
import LoginForm from "../components/LoginForm"
import SignupForm from "../components/SignupForm"

const Login = ({ tag }) => {
    return (
        <section className='login-container flex-cc'>
            <div className='box flex-column'>
                <div className='buttons flex-cc'>
                    <Link to='/login' className={tag === 'login' ? 'active' : 'inactive'}>Ingresar</Link>
                    <Link to='/signup' className={tag === 'login' ? 'inactive' : 'active'}>Crear cuenta</Link>
                </div>
                <h1>
                    {tag === 'login' ? 'Ingresar a la cuenta' : 'Nuevo registro'}
                </h1>
                <div className="form">
                    {tag === 'login'
                        ? <LoginForm />
                        : <SignupForm />
                    }
                </div>
            </div>
        </section>
    )
}

export default Login