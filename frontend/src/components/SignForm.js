import { useNavigate, useLocation } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import InputText from './InputText'
import message from '../utils/message'
import userActions from '../redux/actions/usersActions'
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'

const SignForm = ({ login, signup }) => {
    const navigate = useNavigate()
    const path = useLocation().pathname
    const [defaultValues, setDefaultValues] = useState({ email: '', password: '', username: '' })
    const [validationSchema, setValidationSchema] = useState({
        email: Yup.string().email('Formato de correo inválido').required('Campo requerido'),
        password: Yup.string().min(6, 'Contraseña demasiado corta').required('Campo requerido'),
        username: Yup.string().min(4, 'Nombre de usuario demasiado corto').required('Campo requerido')
    })

    useEffect(() => {
        if (path === '/login') {
            setDefaultValues({ email: '', password: '' })
            setValidationSchema({
                email: validationSchema.email,
                password: validationSchema.password
            })
        } else {
            setDefaultValues({ ...defaultValues, username: '' })
            setValidationSchema({
                ...validationSchema,
                username: Yup.string().min(4, 'Nombre de usuario demasiado corto').required('Campo requerido')
            })
        }
    }, [path])

    const sign = async (user) => {
        try {
            const response = path === '/login' ? await login(user) : await signup(user)

            if (response.success) {
                const text = path === '/login' ? 'Ingreso correcto' : 'Cuenta creada correctamente'

                message('success', text, 'top')
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
                {path === '/signup' && <InputText name='username' id='username' placeholder='Nombre de usuario' />}
                <InputText name='email' id='email' placeholder='Correo electrónico' />
                <InputText name='password' id='password' placeholder='Contraseña' type='password' />
                <button type='submit' id='send'>Ingresar</button>
            </Form>
        </Formik>
    )
}

const mapDispatchToProps = {
    login: userActions.login,
    signup: userActions.signup
}

export default connect(null, mapDispatchToProps)(SignForm)