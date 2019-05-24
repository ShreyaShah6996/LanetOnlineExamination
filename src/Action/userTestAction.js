import * as userTestService from '../Services/userTestService';
import { ADD_USERTEST, ADD_USERTEST_FAILED, GET_USERTEST, GET_USERTEST_FAILED } from '../Reducer/userTestReducer';

export const addUserTest = (data) => {
    return dispatch => {
        return userTestService.addUserTest(data)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: ADD_USERTEST,
                        userTest: response.data["userTest"]
                    })
                }
            })
            .catch((error) => {
                dispatch({
                    type: ADD_USERTEST_FAILED,
                    addUserTestError: error.response.data.error
                })
            })
    }
}

export const getUserTest = (id) => {
    return dispatch => {
        return userTestService.getUserTest(id)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: GET_USERTEST,
                        getUserTest: response.data
                    })
                }
            })
            .catch((error) => {
                dispatch({
                    type: GET_USERTEST_FAILED,
                    getUserTestError: error.response.data.error
                })
            })
    }
}