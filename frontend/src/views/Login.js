import { Link } from 'react-router-dom'
import LoginForm from "../components/LoginForm"
import SignupForm from "../components/SignupForm"

const Login = ({ tag }) => {
    return (
        <section className='login-container flex-cc'>
            <div className='box'>
                <div className='buttons flex-cc'>
                    <Link to='/login' className={tag === 'login' ? 'active' : 'inactive'}>Ingresar</Link>
                    <Link to='/signup' className={tag === 'login' ? 'inactive' : 'active'}>Crear cuenta</Link>
                </div>
                {tag === 'login'
                    ? <LoginForm />
                    : <SignupForm />
                }
            </div>
        </section>
    )
}

export default Login