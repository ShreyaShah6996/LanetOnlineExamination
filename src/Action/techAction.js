import { ADD_TECHNOLOGY, DELETE_SUBTECHNOLOGY, DELETE_TECHNOLOGY, EDIT_TECHNOLOGY, GET_SUBTECHNOLOGY, GET_TECHNOLOGY, INVALID_DATA } from '../Reducer/techReducer';
import * as techService from '../Services/techService';


export const GetTechnologyAction = () => {

    return (dispatch) => {
        return techService.GetTechnology()
            .then((response) => {
                if (response.status === 200) {

                    dispatch({
                        type: GET_TECHNOLOGY,
                        data: response.data
                    })
                }
            })
            .catch((error) => {
                if (error) {
                    // debugger;
                    dispatch({
                        type: INVALID_DATA,
                        error: "Invalid data"
                    });
                }
            })
    }
}

export const GetSubtechnologyAction = (techId) => {
    return (dispatch) => {
        return techService.GetSubtechnology(techId)
            .then((response) => {
                if (response.status === 200) {

                    dispatch({
                        type: GET_SUBTECHNOLOGY,
                        data: response.data
                    })
                }
            })
            .catch((error) => {
                if (error) {
                    dispatch({
                        type: INVALID_DATA,
                        error: "Invalid data"
                    });
                }
            })
    }
}

export const AddTechnologyAction = (data) => {
    // debugger;
    return (dispatch) => {
        return techService.AddTechnology(data)
            .then((response) => {
                if (response.status === 200) {

                    dispatch({
                        type: ADD_TECHNOLOGY,
                        data: response.data
                    })
                }
            })
            .catch((error) => {
                if (error) {
                    // debugger;
                    dispatch({
                        type: INVALID_DATA,
                        error: "Invalid data"
                    });
                }
            })
    }
}
export const EditTechnologyAction = (id,data) => {
    // debugger;
    return (dispatch) => {
        return techService.EditTechnology(id,data)
            .then((response) => {
                if (response.status === 200) {

                    dispatch({
                        type: EDIT_TECHNOLOGY,
                        data: response.data
                    })
                }
            })
            .catch((error) => {
                if (error) {
                    // debugger;
                    dispatch({
                        type: INVALID_DATA,
                        error: "Invalid data"
                    });
                }
            })
    }
}
export const DeleteTechnologyAction = (id) => {
    // debugger;
    return (dispatch) => {
        return techService.DeleteTechnology(id)
            .then((response) => {
                if (response.status === 200) {

                    dispatch({
                        type: DELETE_TECHNOLOGY,
                        data: response.data
                    })
                }
            })
            .catch((error) => {
                if (error) {
                    // debugger;
                    dispatch({
                        type: INVALID_DATA,
                        error: "Invalid data"
                    });
                }
            })
    }
}

export const DeleteSubtechnologyAction = (id) => {
    return (dispatch) => {
        return techService.DeleteSubtechnology(id)
            .then((response) => {
                if (response.status === 200) {

                    dispatch({
                        type: DELETE_SUBTECHNOLOGY,
                        data: response.data
                    })
                }
            })
            .catch((error) => {
                if (error) {
                    // debugger;
                    dispatch({
                        type: INVALID_DATA,
                        error: "Invalid data"
                    });
                }
            })
    }
}
