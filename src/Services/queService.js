import BaseService from './baseService';


export function AddQuestion(data) {
    return BaseService.post('api/question', data);
}
export function getAllQuestion() {
    return BaseService.get('api/question');
}

export function getQuestionById(id) {
    return BaseService.get(`api/question/${id}`);
}