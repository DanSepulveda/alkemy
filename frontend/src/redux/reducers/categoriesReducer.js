const initialState = {
    income_categories: null,
    expense_categories: null
}

const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL':
            return {
                income_categories: action.payload.filter(category => category.type === 'income'),
                expense_categories: action.payload.filter(category => category.type === 'expense')
            }
        default:
            return {
                ...state
            }
    }
}

export default categoriesReducer