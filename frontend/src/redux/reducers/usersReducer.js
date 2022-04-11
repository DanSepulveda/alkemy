const initialState = {
    id: null,
    username: null,
    email: null,
    token: null
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOG_IN_USER":
            localStorage.setItem('token', action.payload.token)
            return {
                id: action.payload.id,
                username: action.payload.username,
                email: action.payload.email,
                token: action.payload.token,
            }
        case "LOG_OUT":
            localStorage.clear()
            return {
                user: null,
                token: null,
                id: null
            }
        case "LOG_IN_LS":

            return {
                token: action.payload.token,
                user: { firstName: action.payload.firstName, imageUrl: action.payload.imageUrl, _id: action.payload.id },
                id: action.payload._id
            }
        default:
            return {
                ...state
            }
    }
}

export default usersReducer