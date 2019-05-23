import * as userService from '../Services/userService';
import { GET_USER, GET_USER_FAILED, DELETE_USER, DELETE_USER_FAILED, SEARCH, SEARCH_FAILED } from '../Reducer/userReducer';

export const getUser = (pageNo, recordPerPage, fieldName, sortDirection) => {
    return dispatch => {
        userService.getLimitedUser(pageNo, recordPerPage, fieldName, sortDirection)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: GET_USER,
                        limitedUser: response.data
                    })
                }
            })
            .catch((error) => {
                dispatch({
                    type: GET_USER_FAILED,
                    getUserError: error.response.data.error
                })
            })
    }
}

export const getAllUser = () => {
    return dispatch => {
        userService.getAllUser()
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: GET_USER,
                        limitedUser: response.data
                    })
                }
            })
            .catch((error) => {
                dispatch({
                    type: GET_USER_FAILED,
                    getUserError: error.response.data.error
                })
            })
    }
}

export const deleteUser = (userId, pageNo, recordPerPage, fieldName, sortDirection) => {
    return (dispatch) => {
        userService.deleteUser(userId).then((res) => {
            if (res.status === 200) {
                userService.getLimitedUser(pageNo, recordPerPage, fieldName, sortDirection).then((response) => {
                    if (response.status === 200) {
                        dispatch({
                            type: DELETE_USER,
                            limitedUser: response.data
                        });
                    }
                })
            }
        }).catch((error) => {
            if (error.response) {
                dispatch({
                    type: DELETE_USER_FAILED,
                    deleteUserError: error.response.data.error
                });
            }
        })
    }
};

export const search = (searchTerm) => {
    return dispatch => {
        userService.search(searchTerm)
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: SEARCH,
                        searchResponse: response.data
                    })
                }
            })
            .catch((error) => {
                dispatch({
                    type: SEARCH_FAILED,
                    searchError: error.response.data.error
                })
            })
    }
}