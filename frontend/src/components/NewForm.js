import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import InputText from './InputText'

const NewForm = () => {
    const defaultValues = path === '/login'
        ? { date: '', description: '', type: '', category: '', amount: '' }
        : { username: '', email: '', password: '' }

    const validationSchema = {
        email: Yup.string()
            .email('Formato de correo inválido')
            .required('Campo requerido'),
        password: Yup.string()
            .min(6, 'Contraseña demasiado corta')
            .required('Campo requerido')
    }

    if (path === '/signup') {
        validationSchema.username = Yup.string()
            .min(4, 'Nombre de usuario demasiado corto')
            .required('Campo requerido')
    }

    return (
        <section>
            <Formik
                initialValues={defaultValues}
                validationSchema={Yup.object(validationSchema)}
                onSubmit={values => sign(values)}
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
        </section>
    )
}

export default NewForm