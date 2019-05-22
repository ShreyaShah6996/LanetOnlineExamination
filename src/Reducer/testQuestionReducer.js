const INITIAL_STATE = {
    test_question: [],
    test_question_error: '',
}

export const GET_TEST_QUESTION = "GET_TEST_QUESTION";
export const GET_TEST_QUESTION_FAILED = "GET_TEST_QUESTION_FAILED";
export const UPDATE_QUESTION = "UPDATE_QUESTION";
export const UPDATE_QUESTION_FAILED = "UPDATE_QUESTION_FAILED";

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_TEST_QUESTION: {
            return Object.assign({}, state, { test_question: action.test_question, test_question_error: "" });
        }
        case GET_TEST_QUESTION_FAILED: {
            return Object.assign({}, state, { test_question_error: action.test_question_error, test_question: [] });
        }
        case UPDATE_QUESTION: {
            return Object.assign({}, state, { test_question: action.test_question, test_question_error: "" });
        }
        case UPDATE_QUESTION_FAILED: {
            return Object.assign({}, state, { test_question_error: action.test_question_error, test_question: [] });
        }
        default:
            return state;
    }
}