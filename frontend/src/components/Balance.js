const Balance = ({ data }) => {
    const formatter = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
    })

    return (
        <section className="card flex-cc">
            <div className="flex-column-center">
                <h2>
                    <i className="fas fa-balance-scale"></i>
                    Balance
                </h2>
                <span>{formatter.format(data.total_income - data.total_expenses)}</span>
            </div>
        </section>
    )
}

export default Balance