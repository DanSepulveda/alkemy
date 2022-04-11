import { combineReducers } from 'redux'
import usersReducer from './usersReducer'
import categoriesReducer from './categoriesReducer'
import transactionsReducer from './transactionsReducer'

const rootReducer = combineReducers({
    users: usersReducer,
    categories: categoriesReducer,
    transactions: transactionsReducer
})

export default rootReducer