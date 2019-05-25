import BaseService from './baseService';

export function getUserData(id) {
    return BaseService.get(`/api/userData/${id}`);
}
