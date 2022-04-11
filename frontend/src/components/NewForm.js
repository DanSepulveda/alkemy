import { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import InputText from './InputText'
import InputSelect from './InputSelect'
import categoriesActions from '../redux/actions/categoriesActions'
import { connect } from 'react-redux'

const NewForm = ({ setForm, getCategories, categories }) => {
    const [cat, setCat] = useState('income')

    useEffect(() => {
        getCategories()
    }, [])

    const defaultValues = true === '/login'
        ? { date: '', type: '', category: 'health', description: '', amount: '' }
        : { date: '', type: '', category: 'health', description: '', amount: '' }

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
                <div className='flex-cc'>
                    <i className='fas fa-times-circle' onClick={() => setForm(false)}></i>
                </div>
                <Formik
                    initialValues={defaultValues}
                    validationSchema={Yup.object(validationSchema)}
                    onSubmit={values => console.log(values)}
                >
                    <Form className='flex-column'>
                        <InputText
                            name='date'
                            id='date'
                            label='Fecha'
                            type='date'
                        />

                        <InputSelect label='Tipo de operación' name='type' onChangeCapture={(e) => setCat(e.target.value)}>
                            <option value='income' onClick={() => alert('income')}>Ingreso</option>
                            <option value='expense' onClick={() => setCat('expense')}>Gasto</option>
                        </InputSelect>

                        <InputSelect label='Categoría' name='category'>
                            {categories.filter(category => category.type === cat).map(category =>
                                <option
                                    value={category.id}
                                    key={category.id}
                                >
                                    {category.name.toUpperCase()}
                                </option>)
                            }
                        </InputSelect>

                        <InputText
                            name='amount'
                            id='amount'
                            placeholder='Ej: 8000'
                            label='Monto'
                            type='number'
                        />
                        <InputText
                            name='description'
                            id='description'
                            placeholder='Ej: cuenta de luz'
                            label='Descripción'
                        />
                        <button type='submit' id='send'>
                            Guardar
                        </button>
                    </Form>
                </Formik>
            </div>
        </section>
    )
}

const mapStateToProps = state => {
    return {
        categories: state.categories.categories
    }
}

const mapDispatchToProps = {
    getCategories: categoriesActions.getCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(NewForm)