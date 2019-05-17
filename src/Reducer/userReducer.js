const INITIAL_STATE = {
    get_limited_user: [],
    get_user_error: ""
}

export const GET_USER = 'GET_USER';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const DELETE_USER = 'DELETE_USER';
export const DELETE_USER_FAILED = 'DELETE_USER_FAILED';

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_USER: {
            return Object.assign({}, state, { get_limited_user: action.limitedUser, get_user_error: "" });
        }
        case GET_USER_FAILED: {
            return Object.assign({}, state, { get_user_error: action.getUserError, get_limited_user: [] });
        }
        case DELETE_USER: {
            return Object.assign({}, state, { get_limited_user: action.limitedUser, get_user_error: "" });
        }
        case DELETE_USER_FAILED: {
            return Object.assign({}, state, { get_user_error: action.deleteUserError, get_limited_user: [] });
        }
        default:
            return state;
    }
}