import axios from 'axios'

const HOST = 'http://localhost:4000/api'

const transactionsActions = {
    getResume: (token) => {
        return async (dispatch) => {
            const response = await axios.get(`${HOST}/resume`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.data.success) {
                dispatch({ type: 'RESUME', payload: response.data.response })
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
    }
}

export default transactionsActions