// import styles from '../styles/Input.module.css'
import { useField } from 'formik'

const InputText = ({ label, ...props }) => {
    const [field, meta] = useField(props)

    return (
        <div>
            {props.label && <label htmlFor={props.id}>{label}</label>}
            <input type={props.type || 'text'} {...field} {...props} />
            <div><span>{meta.touched && meta.error ? `* ${meta.error}` : null}</span></div>
        </div>
    )
}

export default InputText