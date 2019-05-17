import BaseService from './baseService';

export function getTestQuestion(testId) {
    return BaseService.get('/api/testQuestion/' + testId);
}

export function shuffleQuestion(testId, testQuestionId) {
    return BaseService.put('api/testQuestion/' + testId + '/' + testQuestionId);
}