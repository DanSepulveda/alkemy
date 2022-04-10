import { Formik, Form } from 'formik'
import { useEffect } from 'react'
import * as Yup from 'yup'
import InputText from '../components/InputText'
import userActions from '../utils/usersActions'
import { useNavigate } from 'react-router-dom'

const SignupForm = () => {
    const navigate = useNavigate()

    const createUser = async (user) => {
        try {
            const response = await userActions.signup(user)
            if (response.success) {
                navigate('/')
            } else {
                alert(response.error)
            }
        } catch (error) {
            alert('ha ocurrido un problema')
        }
    }

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
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
            onSubmit={async (values, { resetForm }) => {
                createUser(values)
            }}
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