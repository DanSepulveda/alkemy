import { useField } from 'formik'

const InputSelect = ({ label, ...props }) => {
    const [field, meta] = useField(props)
    return (
        <div className='input'>
            {label && <label htmlFor={props.name}>{label}</label>}

            <select name={props.name} {...field} {...props}>
                {props.children}
            </select>
            <div><span>{meta.touched && meta.error ? `* ${meta.error}` : null}</span></div>
        </div>
    )
}

export default InputSelect