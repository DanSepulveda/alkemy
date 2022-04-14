const initialState = {
    categories: []
}

const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_CATEGORIES':
            return {
                categories: action.payload
            }
        case 'CLEAR_CATEGORIES':
            return {
                categories: []
            }
        default:
            return {
                ...state
            }
    }
}

export default categoriesReducer