import { useField, Field } from 'formik'

const InputSelect = ({ label, ...props }) => {
    const [field, meta] = useField(props)

    return (
        <div className='input'>
            {label && <label htmlFor={props.id}>{label}</label>}
            <Field name="type" as="select">
                <option value="income">Ingreso</option>
                <option value="expense">Gasto</option>
            </Field>
            <div><span>{meta.touched && meta.error ? `* ${meta.error}` : null}</span></div>
        </div>
    )
}

export default InputSelect