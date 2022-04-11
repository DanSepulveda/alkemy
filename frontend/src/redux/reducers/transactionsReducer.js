const initialState = {
    balance: null,
    top10: null
}

const transactionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'RESUME':
            return {
                balance: action.payload.resume[0],
                top10: action.payload.top10
            }
        case 'DELETE':
            console.log('reducer')
            console.log(action.payload)
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