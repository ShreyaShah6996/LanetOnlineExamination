import * as queService from '../Services/queService';
import { ADD_QUESTION, INVALID_DATA, GET_ALL_QUESTION, GET_ALL_QUESTION_FAILED } from '../Reducer/queReducer';

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
                    let ques = [];
                    response.data.map(data => {
                        ques = JSON.parse(data.question);
                        return data.question = ques;
                    })
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
