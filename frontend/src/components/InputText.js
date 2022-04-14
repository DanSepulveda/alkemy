import { useField } from 'formik'

const InputText = ({ label, ...props }) => {
    const [field, meta] = useField(props)

    return (
        <div className='input'>
            {label && <label htmlFor={props.id}>{label}</label>}
            <input
                type={props.type || 'text'} {...field} {...props}
                readOnly
                onFocus={(e) => e.target.removeAttribute('readOnly')}
                autoComplete='off'
            />
            <div><span>{meta.touched && meta.error ? `* ${meta.error}` : null}</span></div>
        </div>
    )
}

export default InputText