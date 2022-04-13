import axios from 'axios'

const HOST = 'http://localhost:4000/api'

const categoriesActions = {
    getCategories: () => {
        return async (dispatch) => {
            const response = await axios.get(`${HOST}/categories`)
            if (response.data.success) {
                dispatch({ type: 'GET_CATEGORIES', payload: response.data.response })
            }
            return response.data
        }
    }
}

export default categoriesActions