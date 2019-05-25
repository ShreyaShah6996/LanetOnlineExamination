const INITIAL_STATE = {
    userTest: [],
    add_userTest_error: '',
    get_userTest: [],
    get_usertest_error: '',
    update_userTest_error: ''
}

export const ADD_USERTEST = "ADD_USERTEST";
export const ADD_USERTEST_FAILED = "ADD_USERTEST_FAILED";
export const GET_USERTEST = "GET_USERTEST";
export const GET_USERTEST_FAILED = "GET_USERTEST_FAILED";
export const UPDATE_USERTEST = "USERTEST_FAILED";
export const UPDATE_USERTEST_FAILED = " UPDATE_USERTEST_FAILED";

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_USERTEST: {
            return Object.assign({}, state, { userTest: action.userTest, add_userTest_error: "" });
        }
        case ADD_USERTEST_FAILED: {
            return Object.assign({}, state, { add_userTest_error: action.addUserTestError, userTest: [] });
        }
        case GET_USERTEST: {
            return Object.assign({}, state, { get_userTest: action.getUserTest, get_usertest_error: "" });
        }
        case GET_USERTEST_FAILED: {
            return Object.assign({}, state, { get_usertest_error: action.getUserTestError, get_userTest: [] });
        }
        case UPDATE_USERTEST: {
            return Object.assign({}, state, { userTest: action.updateUserTest, update_userTest_error: "" });
        }
        case UPDATE_USERTEST_FAILED: {
            return Object.assign({}, state, { userTest: [], update_userTest_error: action.updateUserTestError });
        }
        default:
            return state;
    }
}