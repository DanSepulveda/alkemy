import reduce from '../../utils/reduce'

const initialState = {
    balance: {},
    top10: [],
    allTransactions: [],
    top10Fetched: false,
    allTransactionsFetched: false
}

const transactionsReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case 'CREATE_TRANSACTION':
            let newTransactions = JSON.parse(JSON.stringify(state.allTransactions))
            newTransactions.push(payload)
            newTransactions = newTransactions.sort((a, b) => new Date(b.date) - new Date(a.date))
            return {
                ...state,
                allTransactions: newTransactions,
                top10: newTransactions.slice(0, 10),
                balance: {
                    total_expenses: reduce(newTransactions, 'expense'),
                    total_income: reduce(newTransactions, 'income')
                }
            }
        case 'GET_TRANSACTIONS':
            return {
                ...state,
                allTransactions: payload,
                allTransactionsFetched: true,
            }
        case 'GET_RESUME':
            return {
                ...state,
                balance: payload.resume[0],
                top10: payload.top10,
                top10Fetched: true
            }
        case 'EDIT_TRANSACTION':
            let updatedTransactions = JSON.parse(JSON.stringify(state.allTransactions)).filter(transaction => transaction.id !== payload.id)
            updatedTransactions.push(payload)
            updatedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date))
            return {
                ...state,
                allTransactions: updatedTransactions,
                top10: updatedTransactions.slice(0, 10),
                balance: {
                    total_expenses: reduce(updatedTransactions, 'expense'),
                    total_income: reduce(updatedTransactions, 'income')
                }
            }
        case 'DELETE':
            let updated = state.allTransactions.filter(transaction => transaction.id !== payload)
            updated.sort((a, b) => new Date(b.date) - new Date(a.date))
            return {
                ...state,
                allTransactions: updated,
                top10: updated.slice(0, 10),
                balance: {
                    total_expenses: reduce(updated, 'expense'),
                    total_income: reduce(updated, 'income')
                }
            }
        case 'CLEAR_TRANSACTIONS':
            return {
                balance: {},
                top10: [],
                allTransactions: [],
                top10Fetched: false,
                allTransactionsFetched: false
            }
        default:
            return {
                ...state
            }
    }
}

export default transactionsReducer