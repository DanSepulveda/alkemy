import axios from 'axios'

const HOST = 'http://localhost:4000/api'

const transactionsActions = {
    createTransaction: (transaction, token) => {
        return async (dispatch) => {
            const response = await axios.post(`${HOST}/transactions`, transaction, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.data.success) {
                dispatch({ type: 'CREATE_TRANSACTION', payload: response.data.response })
            }
            return response.data
        }
    },
    getTransactionsByUser: (token) => {
        return async (dispatch) => {
            const response = await axios.get(`${HOST}/transactions`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.data.success) {
                dispatch({ type: 'GET_TRANSACTIONS', payload: response.data.response })
            }
            return response.data
        }
    },
    getResume: (token) => {
        return async (dispatch) => {
            const response = await axios.get(`${HOST}/resume`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.data.success) {
                dispatch({ type: 'GET_RESUME', payload: response.data.response })
            }
            return response.data
        }
    },
    editTransaction: (id, values, token) => {
        return async (dispatch) => {
            const response = await axios.put(`${HOST}/transaction/${id}`, values, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.data.success) {
                dispatch({ type: 'EDIT_TRANSACTION', payload: response.data.response })
            }
            return response.data
        }
    },
    deleteTransaction: (id, token) => {
        return async (dispatch) => {
            const response = await axios.delete(`${HOST}/transaction/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.data.success) {
                dispatch({ type: 'DELETE', payload: id })
            }
            return response.data
        }
    },
    filter: (filters) => {
        return (dispatch) => {
            dispatch({ type: 'FILTER', payload: filters })
        }
    }
}

export default transactionsActions