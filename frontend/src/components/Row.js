const Row = ({ transaction }) => {
    const { id, date, type, name, image, description, amount } = transaction

    const icon = type === 'expense' ? 'down' : 'up'

    const formatter = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
    })

    return (
        <div className="row">
            <div className="flex-column-center" style={{ width: '15%' }}>
                <span className="title">Fecha</span>
                <span>{(new Date(date)).toLocaleDateString()}</span>
            </div>
            <div className="flex-column-center" style={{ width: '5%' }}>
                <span className="title">Tipo</span>
                <span><i className={`fas fa-arrow-${icon}`}></i></span>
            </div>
            <div className="flex-column-center" style={{ width: '10%' }}>
                <span className="title">Categoría</span>
                <span><i className={`fas fa-${image}`}></i></span>
            </div>
            <div className="flex-column" style={{ width: '50%' }}>
                <span className="title">Descripción</span>
                <span>{description}</span>
            </div>
            <div className="flex-column-center" style={{ width: '10%' }}>
                <span className="title">Monto</span>
                <span>{formatter.format(amount)}</span>
            </div>
            <div className="flex-column-center" style={{ width: '10%' }}>
                <span className="title">Acciones</span>
                <div>
                    <i class="fas fa-edit"></i>
                    <i class="fas fa-trash-alt"></i>
                </div>
            </div>
        </div>
    )
}

export default Row