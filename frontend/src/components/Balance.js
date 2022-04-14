import formatter from '../utils/formatMoney'
import { connect } from 'react-redux'

const Balance = ({ balance }) => {
    const { total_income, total_expenses } = balance

    const result = total_income - total_expenses

    const className = result < 0 ? 'red' : 'green'

    return (
        <section className='card flex-cc'>
            <div className='flex-column-center bradius5 card-content'>
                <h2>
                    <i className='fas fa-balance-scale'></i>
                    Balance
                </h2>
                <span className={className}>{formatter.format(result)}</span>
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