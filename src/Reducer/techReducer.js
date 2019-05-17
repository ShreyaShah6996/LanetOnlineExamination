const INITIAL_STATE = {
    technology: [],
    subtechnology:[],
    error:''
}

export const GET_TECHNOLOGY = 'GET_TECHNOLOGY';
export const INVALID_DATA = 'INVALID_DATA';
export const GET_SUBTECHNOLOGY="GET_SUBTECHNOLOGY";
export const ADD_TECHNOLOGY="ADD_TECHNOLOGY";

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_TECHNOLOGY: {
            return Object.assign({}, state, { technology: action.data });
        }
        case GET_SUBTECHNOLOGY: {
            return Object.assign({}, state, { subtechnology: action.data });
        }
        case ADD_TECHNOLOGY:{
            let tech=state.technology
            let d=action.data
            tech.push(d)
            return Object.assign({}, state, { technology:[...tech]  });
        }
        case INVALID_DATA: {
            return Object.assign({}, state, { error: action.error });
        }
        default:
            return state;
    }
}