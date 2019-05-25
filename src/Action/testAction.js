import * as testService from '../Services/testService';
import { ADD_TEST, ADD_TEST_FAILED, GET_TEST, GET_TEST_FAILED, DELETE_TEST, DELETE_TEST_FAILED, GET_ALL_TEST, GET_ALL_TEST_FAILED } from '../Reducer/testReducer';

export const addTest = (data) => {
    return (dispatch) => {
        return new Promise((resolve, reject)=> {
            return testService.addTest(data)
                .then((response) => {
                    if (response.status === 200) {
                        resolve({
                            type: ADD_TEST,
                            add_test: response.data
                        })
                    }
                })
                .catch((error) => {
                    if (error) {
                        dispatch({
                            type: ADD_TEST_FAILED,
                            test_error: "Invalid data"
                        });
                    }
                })
        })

    }
}

export const getTest = (pageNo, recordPerPage, fieldName, sortDirection) => {
    return dispatch => {
        testService.getTest(pageNo, recordPerPage, fieldName, sortDirection)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: GET_TEST,
                        get_test: response.data
                    })
                }
            })
            .catch((error) => {
                dispatch({
                    type: GET_TEST_FAILED,
                    get_test_error: error.response && error.response.data.error
                })
            })
    }
}

export const getAllTest = () => {
    return dispatch => {
        testService.getAllTest()
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: GET_ALL_TEST,
                        get_all: response.data
                    })
                }
            })
            .catch((error) => {
                dispatch({
                    type: GET_ALL_TEST_FAILED,
                    get_all_error: error.response && error.response.data.error
                })
            })
    }
}

export const deleteTest = (testId, pageNo, recordPerPage, fieldName, sortDirection) => {
    return (dispatch) => {
        testService.deleteTest(testId).then((res) => {
            if (res.status === 200) {
                testService.getTest(pageNo, recordPerPage, fieldName, sortDirection).then((response) => {
                    if (response.status === 200) {
                        dispatch({
                            type: DELETE_TEST,
                            get_test: response.data
                        });
                    }
                })
            }
        }).catch((error) => {
            if (error.response) {
                dispatch({
                    type: DELETE_TEST_FAILED,
                    deleteTestError: error.response && error.response.data.error
                });
            }
        })
    }
};
