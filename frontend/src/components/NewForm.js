import { useEffect, useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import InputText from './InputText'
import InputSelect from './InputSelect'
import categoriesActions from '../redux/actions/categoriesActions'
import transactionsActions from '../redux/actions/transactionsActions'
import { connect } from 'react-redux'
import message from '../utils/message'
import capitalize from '../utils/capitalize'

const NewForm = ({ setForm, getCategories, categories, createTransaction, token, editMode, transaction, editTransaction }) => {
    const [cat, setCat] = useState('income')

    const addTransaction = async (values) => {
        try {
            const response = await createTransaction(values, token)
            if (response.success) {
                message('success', 'Transacción creada correctamente')
                setForm(false)
            } else {
                throw new Error()
            }
        } catch (error) {
            message('error', 'Ha ocurrido un error. Intente más tarde.')
        }
    }

    const edit = async (values) => {
        const isEdited = Object.keys(values).some(key => values[key] !== defaultValues[key])
        if (isEdited) {
            try {
                const response = await editTransaction(transaction.id, values, token)
                if (response.success) {
                    message('success', 'Cambios guardados correctamente')
                    setForm({ open: false, editMode: false, data: null })
                } else {
                    throw new Error()
                }
            } catch (error) {
                message('error', error.message)
            }
        } else {
            message('warning', 'No hay cambios para guardar')
        }
    }

    useEffect(() => {
        getCategories()
        if (editMode) {
            setCat(transaction.type)
        }
        //eslint-disable-next-line
    }, [])

    const defaultValues = editMode
        ? {
            date: (new Date(transaction?.date)).toISOString().split('T')[0],
            type: transaction?.type,
            category: transaction?.category_id,
            description: transaction?.description,
            amount: transaction?.amount
        }
        : { date: '', type: '', category: '', description: '', amount: '' }

    const validationSchema = {
        date: Yup.date().required('Campo requerido'),
        type: Yup.string().required('Campo requerido'),
        category: Yup.number().required('Campo requerido'),
        description: Yup.string().required('Campo requerido'),
        amount: Yup.number().positive('Debe ingresar un valor positivo').required('Campo requerido')
    }

    return (
        <section className='new-transaction flex-cc'>
            <div>
                <div className='flex-cc' style={{ 'justifyContent': 'space-between' }}>
                    <h2>{editMode ? 'Editar transacción' : 'Nueva transacción'}</h2>
                    <i className='fas fa-times-circle' onClick={() => setForm({ open: false, editMode: false, data: null })}></i>
                </div>
                <Formik
                    initialValues={defaultValues}
                    validationSchema={Yup.object(validationSchema)}
                    onSubmit={values => editMode ? edit(values) : addTransaction(values)}
                >
                    <Form className='flex-column'>
                        <InputText name='date' id='date' label='Fecha' type='date' />

                        <InputSelect
                            label='Tipo de operación'
                            name='type'
                            onChangeCapture={(e) => setCat(e.target.value)}
                            id='type'
                            disabled={editMode ? true : false}
                        >
                            <option value='' disabled>Seleccionar tipo</option>
                            <option value='income' onClick={() => alert('income')}>Ingreso</option>
                            <option value='expense' onClick={() => setCat('expense')}>Gasto</option>
                        </InputSelect>

                        <InputSelect label='Categoría' name='category'>
                            <option value='' disabled>Seleccionar categoría</option>
                            {categories.filter(category => category.type === cat).map(category =>
                                <option
                                    value={category.id}
                                    key={category.id}
                                >
                                    {capitalize(category.name)}
                                </option>)
                            }
                        </InputSelect>

                        <InputText name='amount' id='amount' placeholder='Ej: 8000' label='Monto' type='number' />
                        <InputText name='description' id='description' placeholder='Ej: cuenta de luz' label='Descripción' />
                        <button type='submit' id='send'>
                            {editMode ? 'Editar' : 'Guardar'}
                        </button>
                    </Form>
                </Formik>
            </div>
        </section>
    )
}

const mapStateToProps = state => {
    return {
        categories: state.categories.categories,
        token: state.users.token
    }
}

const mapDispatchToProps = {
    getCategories: categoriesActions.getCategories,
    createTransaction: transactionsActions.createTransaction,
    editTransaction: transactionsActions.editTransaction
}

export default connect(mapStateToProps, mapDispatchToProps)(NewForm)