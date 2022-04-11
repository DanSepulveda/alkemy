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
        default:
            return {
                ...state
            }
    }
}

export default transactionsReducer