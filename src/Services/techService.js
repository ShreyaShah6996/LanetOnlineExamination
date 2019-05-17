import BaseService from './baseService';

export function GetTechnology() {
    return BaseService.get('api/technology');
}

export function GetSubtechnology(techId) {
    return BaseService.get('api/subtechnology/tech/'+techId);
}

export function AddTechnology(data) {
    return BaseService.post('api/technology',data);
}