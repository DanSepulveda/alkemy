import { Field } from 'formik'

const InputSelect = ({ label, name, children, ...props }) => {
    return (
        <div className='input'>
            {label && <label htmlFor={name}>{label}</label>}
            <Field name={name} as='select' id={name} {...props}>
                {children}
            </Field>
            <div><span></span></div>
        </div>
    )
}

export default InputSelect