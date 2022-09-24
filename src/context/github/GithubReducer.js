const githubReducer = (state, action) => {
    switch(action.type){
        case 'GET_USERS':
            return {
                ...state,
                users: action.payload,
                loading: false,
            }
        case 'SET_LOADING':
            return {
                ...state,
                loading: true,
            }
        case 'SET_CLEAR':
            return {
                ...state,
                users: [],
            }
        case 'GET_USER':
            return{
                ...state,
                user: action.payload,
                loading: false,
            }
        default:
            return state
    }
}

export default githubReducer