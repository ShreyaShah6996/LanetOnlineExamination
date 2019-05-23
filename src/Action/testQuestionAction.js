import * as testQuestionService from '../Services/testQuestionService';
import { GET_TEST_QUESTION, GET_TEST_QUESTION_FAILED,UPDATE_QUESTION,UPDATE_QUESTION_FAILED } from '../Reducer/testQuestionReducer';

export const getTestQuestion = (testId) => {
    return dispatch => {
        testQuestionService.getTestQuestion(testId)
            .then((response) => {
                if (response.status === 200) {
                    let quesId;
                    if (response.data.quesId) {
                        quesId = JSON.parse(response.data.quesId);
                        response.data.quesId = quesId;
                    }
                    dispatch({
                        type: GET_TEST_QUESTION,
                        test_question: response.data
                    })
                }
            })
            .catch((error) => {
                dispatch({
                    type: GET_TEST_QUESTION_FAILED,
                    test_question_error: error.response && error.response.data.error
                })
            })
    }
}

export const shuffleQuestion = (testId, testQuesId) => {
    return dispatch => {
        testQuestionService.shuffleQuestion(testId, testQuesId)
            .then((response) => {
                if (response.status === 200) {
                    if (response.data.quesId) {
                        response.data.quesId =  JSON.parse(response.data.quesId);
                    }
                    dispatch({
                        type: GET_TEST_QUESTION,
                        test_question: response.data
                    })
                }
            })
            .catch((error) => {
                dispatch({
                    type: GET_TEST_QUESTION_FAILED,
                    test_question_error: error.response.data.error
                })
            })
    }
}

export const updateQuestion = (testId, testQuesId,quesId) => {
    return dispatch => {
        testQuestionService.updateQuestion(testId, testQuesId,quesId)
            .then((response) => {
                if (response.status === 200) {
                    let quesId;
                    if (response.data.quesId) {
                        quesId = JSON.parse(response.data.quesId);
                        response.data.quesId = quesId;
                    }
                    debugger
                    dispatch({
                        type: UPDATE_QUESTION,
                        test_question: response.data
                    })
                }
            })
            .catch((error) => {
                dispatch({
                    type: UPDATE_QUESTION_FAILED,
                    test_question_error: error.response.data.error
                })
            })
    }
}