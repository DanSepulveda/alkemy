import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import InputText from './InputText'
import message from '../utils/message'
import userActions from '../redux/actions/usersActions'

const SignForm = ({ tag, setUser }) => {
    const navigate = useNavigate()

    const defaultValues = tag === 'login'
        ? { email: '', password: '' }
        : { username: '', email: '', password: '' }

    const validationSchema = {
        email: Yup.string()
            .email('Formato de correo inválido')
            .required('Campo requerido'),
        password: Yup.string()
            .min(6, 'Contraseña demasiado corta')
            .required('Campo requerido')
    }

    if (tag === 'sign') {
        validationSchema.username = Yup.string()
            .min(4, 'Nombre de usuario demasiado corto')
            .required('Campo requerido')
    }

    const sign = async (user) => {
        try {
            const response = tag === 'login'
                ? await userActions.login(user)
                : await userActions.signup(user)

            if (response.success) {
                const text = tag === 'login'
                    ? 'Ingreso correcto'
                    : 'Cuenta creada correctamente'

                message('success', text, 'top')
                localStorage.setItem('token', response.response.token)
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
            initialValues={defaultValues}
            validationSchema={Yup.object(validationSchema)}
            onSubmit={values => sign(values)}
        >
            <Form className='flex-column'>
                {tag === 'sign' &&
                    <InputText
                        name='username'
                        id='username'
                        placeholder='Nombre de usuario'
                    />
                }
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

export default SignForm