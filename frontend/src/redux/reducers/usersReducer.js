const initialState = {
    id: null,
    username: null,
    email: null,
    token: null
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            localStorage.setItem('token', action.payload.token)
            return {
                id: action.payload.id,
                username: action.payload.username,
                email: action.payload.email,
                token: action.payload.token,
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