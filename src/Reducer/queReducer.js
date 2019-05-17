const INITIAL_STATE = {
    questions: [],
    error: '',
    get_all_question: [],
    get_all_question_error: ""
}

export const ADD_QUESTION = "ADD_QUESTION"
export const INVALID_DATA = "INVALID_DATA"
export const GET_ALL_QUESTION = 'GET_ALL_QUESTION';
export const GET_ALL_QUESTION_FAILED = 'GET_ALL_QUESTION_FAILED';

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_QUESTION: {
            return Object.assign({}, state, { questions: action.data });
        }
        case INVALID_DATA: {
            return Object.assign({}, state, { error: action.error });
        }
        case GET_ALL_QUESTION: {
            return Object.assign({}, state, { get_all_question: action.data, get_all_question_error: "" });
        }
        case GET_ALL_QUESTION_FAILED: {
            return Object.assign({}, state, { get_all_question_error: action.error, get_all_question: [] });
        }
        default:
            return state;
    }
}