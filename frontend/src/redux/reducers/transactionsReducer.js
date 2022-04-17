import getCategories from '../../utils/getCategories'
import reduce from '../../utils/reduce'

const initialState = {
    balance: {},
    top10: [],
    top10Fetched: false,
    allTransactions: [],
    allTransactionsFetched: false,
    filteredTransactions: [],
    categories: []
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
                balance: {
                    total_expenses: reduce(newTransactions, 'expense'),
                    total_income: reduce(newTransactions, 'income')
                },
                top10: newTransactions.slice(0, 10),
                allTransactions: newTransactions,
                filteredTransactions: newTransactions,
                categories: {
                    income: getCategories(newTransactions, 'income'),
                    expense: getCategories(newTransactions, 'expense')
                }
            }
        case 'GET_TRANSACTIONS':
            return {
                ...state,
                allTransactions: payload,
                allTransactionsFetched: true,
                filteredTransactions: payload,
                categories: {
                    income: getCategories(payload, 'income'),
                    expense: getCategories(payload, 'expense')
                }
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
        case 'FILTER':
            const { type, category, description } = payload

            let filteredTransactions = state.allTransactions.filter(transaction => transaction.type.includes(type))
            filteredTransactions = filteredTransactions.filter(transaction => transaction.name.includes(category))
            filteredTransactions = filteredTransactions.filter(transaction => transaction.description.includes(description))
            return {
                ...state,
                filteredTransactions: filteredTransactions
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