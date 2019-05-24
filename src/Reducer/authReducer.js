const INITIAL_STATE = {
    login_data: [],
    login_error: ""
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS: {
            return Object.assign({}, state, { login_data: action.data, login_error: "" });
        }
        case LOGIN_FAIL: {
            return Object.assign({}, state, { login_error: action.login_error, login_data: [] });
        }
        case LOGOUT: {
            return Object.assign({}, state, { login_data: [] })
        }
        default:
            return state;
    }
}