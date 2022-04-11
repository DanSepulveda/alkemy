import { Formik, Form, Field } from 'formik'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import InputText from './InputText'

const NewForm = ({ setForm }) => {
    const defaultValues = true === '/login'
        ? { date: '', type: '', category: '', description: '', amount: '' }
        : { date: '', type: '', category: '', description: '', amount: '' }

    const validationSchema = {
        date: Yup.date().required('Campo requerido'),
        type: Yup.string().required('Campo requerido'),
        category: Yup.number().required('Campo requerido'),
        description: Yup.string()
            .min(6, 'Contraseña demasiado corta')
            .required('Campo requerido'),
        amount: Yup.number()
            .positive('Debe ingresar un valor positivo')
            .required('Campo requerido'),
    }

    return (
        <section className='new-transaction flex-cc'>
            <div>
                <i className='fas fa-times-circle' onClick={() => setForm(false)}></i>
                <Formik
                    initialValues={defaultValues}
                    validationSchema={Yup.object(validationSchema)}
                    onSubmit={values => console.log(values)}
                >
                    <Form className='flex-column'>
                        <div className='flex-cc'>
                            <InputText
                                name='date'
                                id='date'
                                label='Fecha'
                                type='date'
                            />
                            <div className='input'>
                                <label htmlFor='type'>Tipo de operación</label>
                                <Field name='type' as='select' id='type'>
                                    <option value='income'>Ingreso</option>
                                    <option value='expense'>Gasto</option>
                                </Field>
                                <div><span></span></div>
                            </div>
                        </div>
                        <InputText
                            name='category'
                            id='category'
                            placeholder='Categoría'
                            label='Categoría'
                        />
                        <InputText
                            name='description'
                            id='description'
                            placeholder='Ej: cuenta de luz'
                            label='Descripción'
                        />
                        <InputText
                            name='amount'
                            id='amount'
                            placeholder='Ej: 8000'
                            label='Monto'
                            type='number'
                        />
                        <button type='submit' id='send'>
                            Ingresar
                        </button>
                    </Form>
                </Formik>
            </div>
        </section>
    )
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(NewForm)