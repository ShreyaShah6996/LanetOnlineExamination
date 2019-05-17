const INITIAL_STATE = {
    test: [],
    test_error: '',
    get_test: [],
    get_test_error: '',
    get_all: [],
    get_all_error: ""
}

export const ADD_TEST = "ADD_TEST";
export const ADD_TEST_FAILED = "ADD_TEST_FAILED";
export const GET_TEST = "GET_TEST";
export const GET_TEST_FAILED = "GET_TEST_FAILED";
export const GET_ALL_TEST = "GET_ALL_TEST";
export const GET_ALL_TEST_FAILED = "GET_ALL_TEST_FAILED";
export const DELETE_TEST = 'DELETE_TEST';
export const DELETE_TEST_FAILED = 'DELETE_TEST_FAILED';

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_TEST: {
            return Object.assign({}, state, { test: action.add_test, test_error: "" });
        }
        case ADD_TEST_FAILED: {
            return Object.assign({}, state, { test_error: action.test_error, test: [] });
        }
        case GET_TEST: {
            return Object.assign({}, state, { get_test: action.get_test, get_test_error: "" });
        }
        case GET_TEST_FAILED: {
            return Object.assign({}, state, { get_test_error: action.get_test_error, get_test: [] });
        }
        case GET_ALL_TEST: {
            return Object.assign({}, state, { get_test: action.get_all, get_all: action.get_all, get_all_error: "" });
        }
        case GET_ALL_TEST_FAILED: {
            return Object.assign({}, state, { get_all_error: action.get_all_error, get_all: [] });
        }
        case DELETE_TEST: {
            return Object.assign({}, state, { get_test: action.get_test, get_test_error: "" });
        }
        case DELETE_TEST_FAILED: {
            return Object.assign({}, state, { get_test_error: action.deleteTestError, get_test: [] });
        }

        default:
            return state;
    }
}