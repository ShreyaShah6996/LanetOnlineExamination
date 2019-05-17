import * as techService from '../Services/techService';
import { ADD_TECHNOLOGY, GET_SUBTECHNOLOGY, GET_TECHNOLOGY, INVALID_DATA } from '../Reducer/techReducer';

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
                    dispatch({
                        type: INVALID_DATA,
                        error: "Invalid data"
                    });
                }
            })
    }
}