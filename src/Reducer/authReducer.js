const INITIAL_STATE = {
    registered_data: [],
    register_error: "",
    login_data: [],
    login_error: ""
}

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS: {
            return Object.assign({}, state, { registered_data: action.data, register_error: "" });
        }
        case REGISTER_FAIL: {
            return Object.assign({}, state, { register_error: action.register_error, registered_data: [] });
        }
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