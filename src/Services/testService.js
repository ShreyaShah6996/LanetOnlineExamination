import BaseService from './baseService';

export function addTest(TestData) {
    return BaseService.post('/api/test', TestData);
}

export function getTest(pageNo, recordPerPage, fieldName, sortDirection) {
    return BaseService.get('/api/test/' + pageNo + '/' + recordPerPage + '/' + fieldName + '/' + sortDirection);
}

export function getAllTest() {
    return BaseService.get('/api/test');
}

export function deleteTest(testId) {
    return BaseService.delete('/api/test/delete/' + testId);
}