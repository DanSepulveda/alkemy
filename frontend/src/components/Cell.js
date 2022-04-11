const Cell = ({ title, data }) => {
    return (
        <div className='flex-column-center'>
            <span className='title'>{title}</span>
            <span>{data}</span>
        </div>
    )
}

export default Cell