const INITIAL_STATE = {
    userData: [],
    userData_error: ''
}


export const GET_USERDATA = "GET_USERDATA";
export const GET_USERDATA_FAILED = "GET_USERDATA_FAILED";


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case GET_USERDATA: {
            return Object.assign({}, state, { userData: action.getUserData, userData_error: "" });
        }
        case GET_USERDATA_FAILED: {
            return Object.assign({}, state, { userData_error: action.getUserDataError, userData: [] });
        }
        default:
            return state;
    }
}