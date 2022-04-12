import formatter from '../utils/formatMoney'
import { connect } from 'react-redux'

const Balance = ({ balance }) => {
    const { total_income, total_expenses } = balance

    return (
        <section className='card flex-cc'>
            <div className='flex-column-center bradius5 card-content'>
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
        balance: state.transactions.balance
    }
}

export default connect(mapStateToProps)(Balance)