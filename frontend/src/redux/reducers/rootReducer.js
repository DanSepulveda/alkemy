import { combineReducers } from 'redux'
import usersReducer from './usersReducer'
import transactionsReducer from './transactionsReducer'

const rootReducer = combineReducers({
    users: usersReducer,
    transactions: transactionsReducer
})

export default rootReducer