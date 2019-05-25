import * as collegeService from '../Services/collegeService';
import { GET_COLLEGE, GET_COLLEGE_FAILED } from '../Reducer/collegeReducer';

export const GetCollege = () => {
    return dispatch => {
        collegeService.GetCollege()
            .then((response) => {
                if (response.status === 200) {
                    dispatch({
                        type: GET_COLLEGE,
                        collegelist: response.data
                    })
                }
            })
            .catch((error) => {
                dispatch({
                    type: GET_COLLEGE_FAILED,
                    getCollegeError: error.response&& error.response.data.error
                })
            })
    }
}