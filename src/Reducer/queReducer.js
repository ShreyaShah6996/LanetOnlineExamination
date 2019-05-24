const INITIAL_STATE = {
    alltech: [],
    subtechnology: [],
    questions: [],
    error: '',
    get_all_question: [],
    get_all_question_error: "",
    questionById: []
}

export const GET_ALL_TECH = "GET_ALL_TECH"
export const GET_SUBTECHNOLOGY = "GET_SUBTECHNOLOGY"
export const ADD_QUESTION = "ADD_QUESTION"
export const INVALID_DATA = "INVALID_DATA"
export const GET_ALL_QUESTION = 'GET_ALL_QUESTION';
export const GET_ALL_QUESTION_FAILED = 'GET_ALL_QUESTION_FAILED';
export const GET_QUESTIONBY_ID = 'GET_QUESTIONBY_ID';
export const GET_QUESTIONBY_ID_FAILED = ' GET_QUESTIONBY_ID_FAILED';

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALL_TECH: {
            return Object.assign({}, state, { alltech: action.data });
        }
        case GET_SUBTECHNOLOGY: {
            return Object.assign({}, state, { subtechnology: action.data });
        }
        case ADD_QUESTION: {
            return Object.assign({}, state, { questions: action.data });
        }
        case GET_ALL_QUESTION: {
            return Object.assign({}, state, { get_all_question: action.data, get_all_question_error: "" });
        }
        case GET_ALL_QUESTION_FAILED: {
            return Object.assign({}, state, { get_all_question_error: action.error, get_all_question: [] });
        }
        case INVALID_DATA: {
            return Object.assign({}, state, { error: action.error });
        }
        case GET_QUESTIONBY_ID: {
            return Object.assign({}, state, { questionById: action.data });
        }
        case GET_QUESTIONBY_ID_FAILED: {
            return Object.assign({}, state, { questionById: action.error });
        }
        default:
            return state;
    }
}