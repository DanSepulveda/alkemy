import { Link } from 'react-router-dom'
import SignForm from "../components/SignForm"

const Login = ({ tag, setUser }) => {
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
                    <SignForm tag={tag} setUser={setUser} />
                </div>
            </div>
        </section>
    )
}

export default Login