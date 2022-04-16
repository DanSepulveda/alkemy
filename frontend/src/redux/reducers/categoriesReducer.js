const initialState = {
    categories: []
}

const categoriesReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case 'GET_CATEGORIES':
            return {
                categories: payload
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