import formatter from '../utils/formatMoney'
import { connect } from 'react-redux'

const Balance = ({ data }) => {
    const { total_income, total_expenses } = data

    return (
        <section className='card flex-cc'>
            <div className='flex-column-center'>
                <h2>
                    <i className='fas fa-balance-scale'></i>
                    Balance
                </h2>
                <span>{formatter.format(total_income - total_expenses)}</span>
            </div>
        </section>
    )
}

const mapStateToProps = state => {
    return {
        data: state.transactions.balance
    }
}

export default connect(mapStateToProps)(Balance)