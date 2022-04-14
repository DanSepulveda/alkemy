const Cell = ({ title, data, selector }) => {
    return (
        <div className={`flex-column-center ${selector}`}>
            <span className='title'>{title}</span>
            <span>
                {selector === 'amount-expense'
                    ? `- ${data}`
                    : selector === 'amount-income'
                        ? `+ ${data}`
                        : data
                }
            </span>
        </div>
    )
}

export default Cell