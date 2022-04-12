const initialState = {
    balance: {},
    top10: [],
    allTransactions: [],
}

const transactionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CREATE':
            console.log(action.payload)
            return {
                ...state,
                allTransactions: [...state.allTransactions, action.payload],
                top10: [...state.top10, action.payload]
            }
        case 'GET_ALL':
            return {
                ...state,
                allTransactions: action.payload
            }
        case 'RESUME':
            return {
                ...state,
                balance: action.payload.resume[0],
                top10: action.payload.top10
            }
        case 'DELETE':
            return {
                ...state,
                top10: state.top10.filter(transaction => transaction.id !== action.payload)
            }
        default:
            return {
                ...state
            }
    }
}

export default transactionsReducer