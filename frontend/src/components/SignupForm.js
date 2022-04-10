import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import InputText from '../components/InputText'

const SignupForm = () => {
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
                try {
                    // await login(values)
                    // <Message icon='success' title='Ingreso correcto' position='top' />
                    // navigate('/dashboard')
                } catch (e) {
                    // message('error', e.message)
                }
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
                    Ingresar
                </button>
            </Form>
        </Formik>
    )
}

export default SignupForm