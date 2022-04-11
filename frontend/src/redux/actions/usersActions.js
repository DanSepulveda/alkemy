import axios from 'axios'

const HOST = 'http://localhost:4000/api'

const userActions = {
    signup: (user) => {
        return async (dispatch) => {
            const response = await axios.post(`${HOST}/signup`, user)
            if (response.data.success) {
                dispatch({ type: 'LOGIN', payload: response.data.response })
            }
            return response.data
        }
    },
    login: (user) => {
        return async (dispatch) => {
            const response = await axios.post(`${HOST}/login`, user)
            if (response.data.success) {
                dispatch({ type: 'LOGIN', payload: response.data.response })
            }
            return response.data
        }
    },
    verifyToken: async (token) => {
        const response = await axios.get(`${HOST}/login`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    },
    deleteAccout: (id, token, password) => {
        return async (dispatch) => {
            const response = await axios.post(`${HOST}/user/${id}`, { password }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.data.success) {
                dispatch({ type: 'LOGOUT', payload: null })
            }
            return response.data
        }
    },
    logout: () => {
        return (dispatch) => {
            dispatch({ type: "LOGOUT", payload: null })
        }
    },
}

export default userActions