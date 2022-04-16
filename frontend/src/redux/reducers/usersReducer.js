const initialState = {
    id: null,
    username: null,
    email: null,
    token: null
}

const usersReducer = (state = initialState, action) => {
    const { type, payload } = action

    switch (type) {
        case 'LOGIN':
            const { id, username, email, token } = payload
            localStorage.setItem('token', token)
            return {
                id,
                username,
                email,
                token
            }
        case 'LOGOUT':
            localStorage.removeItem('token')
            return {
                id: null,
                username: null,
                email: null,
                token: null
            }
        default:
            return {
                ...state
            }
    }
}

export default usersReducer