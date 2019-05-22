import {ADD_QUESTION, GET_ALL_QUESTION, GET_ALL_QUESTION_FAILED, GET_ALL_TECH, GET_SUBTECHNOLOGY, INVALID_DATA} from '../Reducer/queReducer';
import * as queService from '../Services/queService';
import * as techService from '../Services/techService';


export const GetAllTechnologyAction = () => {

    return (dispatch) => {
        return techService.GetTechnology()
            .then((response) => {
                if (response.status === 200) {

                    dispatch({
                        type: GET_ALL_TECH,
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
    debugger
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
export const AddQuestionAction = (data) => {
    return (dispatch) => {
        return queService.AddQuestion(data)
            .then((response) => {
                if (response.status === 200) {

                    dispatch({
                        type: ADD_QUESTION,
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

export const getAllQuestion = () => {
    return (dispatch) => {
        return queService.getAllQuestion()
            .then((response) => {
                if (response.status === 200) {
                    // let ques = [];
                    // response.data.map(data => {
                    //     ques = JSON.parse(data.question);
                    //     return data.question = ques;
                    // })
                    dispatch({
                        type: GET_ALL_QUESTION,
                        data: response.data
                    })
                }
            })
            .catch((error) => {
                if (error) {
                    dispatch({
                        type: GET_ALL_QUESTION_FAILED,
                        error: "Invalid data"
                    });
                }
            })
    }
}
