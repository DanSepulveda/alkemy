const Cell = ({ title, data, selector }) => {
    return (
        <div className={`flex-column-center ${selector}`}>
            <span className='title'>{title}</span>
            <span>{data}</span>
        </div>
    )
}

export default Cell