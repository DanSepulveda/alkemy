import axios from 'axios'

const HOST = 'http://localhost:4000/api'

const transactionsActions = {
    getResume: async (token) => {
        const response = await axios.get(`${HOST}/resume`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    },
    deleteTransaction: async (id, token) => {
        const response = await axios.delete(`${HOST}/transaction/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }
}

export default transactionsActions