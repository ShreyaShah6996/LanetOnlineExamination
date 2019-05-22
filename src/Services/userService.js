import BaseService from './baseService';

export function getLimitedUser(pageNo, recordPerPage, fieldName, sortDirection) {
    return BaseService.get('/api/user/' + pageNo + '/' + recordPerPage + '/' + fieldName + '/' + sortDirection);
}

export function getAllUser() {
    return BaseService.get('/api/user');
}

export function deleteUser(userId) {
    return BaseService.delete('api/user/delete/' + userId);
}

export function search(searchText) {
    return BaseService.post('api/user/search/Term',searchText);
}