import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import InputText from './InputText'
import message from '../utils/message'
import userActions from '../utils/usersActions'

const LoginForm = ({ setUser }) => {
    const navigate = useNavigate()

    const login = async (user) => {
        try {
            const response = await userActions.login(user)
            if (response.success) {
                message('success', 'Ingreso correcto')
                setUser(response.response)
                navigate('/')
            } else {
                message('error', response.error)
            }
        } catch (error) {
            message('error', 'Ha ocurrido un error. Intente más tarde.')
        }
    }

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={Yup.object({
                email: Yup.string()
                    .email('Formato de correo inválido')
                    .required('Campo requerido'),
                password: Yup.string()
                    .min(5, 'Contraseña demasiado corta')
                    .required('Campo requerido')
            })}
            onSubmit={values => login(values)}
        >
            <Form className='flex-column'>
                <InputText
                    name='email'
                    id='email'
                    placeholder='Correo electrónico'
                />
                <InputText
                    name='password'
                    id='password'
                    placeholder='Contraseña'
                    type='password'
                />
                <button type='submit' id='send'>
                    Ingresar
                </button>
            </Form>
        </Formik>
    )
}

export default LoginForm