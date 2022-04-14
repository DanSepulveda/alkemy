import reduce from '../../utils/reduce'

const initialState = {
    balance: {},
    top10: [],
    allTransactions: [],
    top10Fetched: false,
    allTransactionsFetched: false
}

const transactionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE_TRANSACTION':
            let newTransactions = JSON.parse(JSON.stringify(state.allTransactions))
            newTransactions.push(action.payload)
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
                allTransactions: action.payload,
                allTransactionsFetched: true,
            }
        case 'GET_RESUME':
            return {
                ...state,
                balance: action.payload.resume[0],
                top10: action.payload.top10,
                top10Fetched: true
            }
        case 'EDIT_TRANSACTION':
            const editedTransaction = action.payload

            let updatedTransactions = JSON.parse(JSON.stringify(state.allTransactions)).filter(transaction => transaction.id !== editedTransaction.id)
            updatedTransactions.push(editedTransaction)
            updatedTransactions.sort((a, b) => a.date - b.date)
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
            const updated = state.allTransactions.filter(transaction => transaction.id !== action.payload)
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