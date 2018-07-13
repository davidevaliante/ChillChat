const defaultId = {userId : 'none', userName : 'Anonymous'}

const userIdReducer = (state = defaultId, action) => {
    switch(action.type){
        case 'UPDATE_USER_ID':
            return {
                ...state,
                userId : action.userId
            }

        case 'UPDATE_USER_NAME':
            return {
                ...state,
                userName : action.name
            }
            
        default:
            return state;
    }
}

export default userIdReducer;
