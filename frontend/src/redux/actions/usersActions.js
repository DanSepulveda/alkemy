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
    verifyToken: (token) => {
        return async (dispatch) => {
            try {
                const response = await axios.get(`${HOST}/login`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                response.data.response.token = token
                dispatch({ type: 'LOGIN', payload: response.data.response })
            } catch (error) {
                return dispatch({ type: 'LOGOUT', payload: null })
            }
        }
    },
    deleteAccout: (id, token, password) => {
        return async (dispatch) => {
            const response = await axios.post(`${HOST}/delete-user/${id}`, { password }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.data.success) {
                dispatch({ type: 'LOGOUT', payload: null })
                dispatch({ type: 'CLEAR_CATEGORIES', payload: null })
                dispatch({ type: 'CLEAR_TRANSACTIONS', payload: null })
            }
            return response.data
        }
    },
    logout: () => {
        return (dispatch) => {
            dispatch({ type: 'LOGOUT', payload: null })
        }
    },
}

export default userActions