import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './Reducer/index';

const composeEnhancer =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancer(
    applyMiddleware(thunk)
);

const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");
const role = localStorage.getItem("role");
const name = localStorage.getItem("name");
// const userName = localStorage.getItem("userName");
const INITIAL_STATE = {
    auth: {
        login_data: []
    }
}

if (token && userId && role && name) {
    INITIAL_STATE.auth.login_data.token = token;
    INITIAL_STATE.auth.login_data.userId = userId;
    INITIAL_STATE.auth.login_data.role = role;
    INITIAL_STATE.auth.login_data.name = name;
    // INITIAL_STATE.auth.login_data.userName = userName;
}

export default createStore(rootReducer, INITIAL_STATE, enhancer);   