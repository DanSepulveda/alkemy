import axios from 'axios'

const HOST = 'http://localhost:4000/api'

const userActions = {
    signup: async (user) => {
        const response = await axios.post(`${HOST}/signup`, user)
        return response.data
    },
    login: async (user) => {
        const response = await axios.post(`${HOST}/login`, user)
        return response.data
    },
    verifyToken: async (token) => {
        const response = await axios.get(`${HOST}/login`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }
}

export default userActions