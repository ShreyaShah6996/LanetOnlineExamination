const INITIAL_STATE = {
    get_college: [],
    get_college_error: ""
}

export const GET_COLLEGE = 'GET_COLLEGE';
export const GET_COLLEGE_FAILED = 'GET_COLLEGE_FAILED';

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_COLLEGE: {
            return Object.assign({}, state, { get_college: action.collegelist, get_college_error: "" });
        }
        case GET_COLLEGE_FAILED: {
            return Object.assign({}, state, { get_college_error: action.getCollegeError, get_college: [] });
        }
        default:
            return state;
    }
}