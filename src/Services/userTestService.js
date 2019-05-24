import BaseService from './baseService';
export function getUserTest(id) {
    return BaseService.get(`/api/userTest/${id}`);
}

export function addUserTest(data) {
    return BaseService.post('api/userTest', data);
}
