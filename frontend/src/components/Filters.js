
const Filters = () => {
    return (
        <section className='filters'>
            <div className='flex-cc'>
                <i className='fas fa-arrow-up'></i>
                <i className='fas fa-arrow-down'></i>
            </div>
            <div className='flex-cc'>
                <select name="" id="">
                    <option>Todo</option>
                    <option>Ingreso</option>
                    <option>Gasto</option>
                </select>
            </div>
            <div className='flex-cc'>
                <select name="" id="">
                    <option value="">lala</option>
                </select>
            </div>
            <div className='flex-cc'>
                <input
                    type='text'
                    placeholder='Buscar por descripción'
                />
            </div>
            <div className='flex-cc'>
                <i className='fas fa-arrow-up'></i>
                <i className='fas fa-arrow-down'></i>
            </div>
        </section>
    )
}

export default Filters