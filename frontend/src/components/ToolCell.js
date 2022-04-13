const ToolCell = ({ title, icon, name, fx, selector }) => {
    return (
        <div className={`flex-column-center ${selector}`}>
            {title && <span className='title'>{title}</span>}
            <span className='icontool'>
                <span onClick={fx && fx}><i className={`fas fa-${icon}`}></i></span>
                <span className={title ? 'tooltip' : 'tooltip border'}>{name}</span>
            </span>
        </div>
    )
}

export default ToolCell