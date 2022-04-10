import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import InputText from './InputText'
import message from '../utils/message'
import userActions from '../utils/usersActions'

const SignupForm = ({ setUser }) => {
    const navigate = useNavigate()

    const createUser = async (user) => {
        try {
            const response = await userActions.signup(user)
            if (response.success) {
                message('success', 'Cuenta creada correctamente')
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
            initialValues={{ username: '', email: '', password: '' }}
            validationSchema={Yup.object({
                username: Yup.string()
                    .min(4, 'Nombre de usuario demasiado corto')
                    .required('Campo requerido'),
                email: Yup.string()
                    .email('Formato de correo inválido')
                    .required('Campo requerido'),
                password: Yup.string()
                    .min(8, 'Contraseña demasiado corta')
                    .required('Campo requerido')
            })}
            onSubmit={values => createUser(values)}
        >
            <Form className='flex-column'>
                <InputText
                    name='username'
                    id='username'
                    placeholder='Nombre de usuario'
                />
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
                    Crear
                </button>
            </Form>
        </Formik>
    )
}

export default SignupForm