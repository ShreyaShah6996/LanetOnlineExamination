import * as userDataService from '../Services/userDataService';
import { GET_USERDATA, GET_USERDATA_FAILED } from '../Reducer/userDataReducer';

export const getUserData = (id) => {
    return dispatch => {
        return userDataService.getUserData(id)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: GET_USERDATA,
                        getUserData: response.data
                    })
                }
            })
            .catch((error) => {
                dispatch({
                    type: GET_USERDATA_FAILED,
                    getUserDataError: error.response.data.error
                })
            })
    }
}