import BaseService from './baseService';

export function getUserTest(id) {
    return BaseService.get(`/api/userTest/${id}`);
}

export function addUserTest(data) {
    return BaseService.post('api/userTest', data);
}

export function updateUserTest(userTestId, data) {
    return BaseService.put(`api/userTest/${userTestId}`, data);
}
