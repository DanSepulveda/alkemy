import capitalize from '../utils/capitalize'

const ToolCell = ({ title, icon, name, fx, selector }) => {
    return (
        <div className={`flex-column-center ${selector}`}>
            {title && <span className='title'>{title}</span>}
            <div className='icontool'>
                <div onClick={fx && fx} className={`flex-cc ${icon}`}><i className={`fas fa-${icon}`}></i></div>
                <span className={title ? 'tooltip' : 'tooltip border'}>{capitalize(name)}</span>
            </div>
        </div>
    )
}

export default ToolCell