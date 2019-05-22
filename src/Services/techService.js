import BaseService from './baseService';


export function GetTechnology() {
    return BaseService.get('api/technology');
}

export function GetSubtechnology(techId) {
    return BaseService.get('api/subTechnology/tech/'+techId);
}

export function AddTechnology(data) {
    return BaseService.post('api/technology',data);
}

export function EditTechnology(id,data) {
    return BaseService.put(`api/technology/${id}`,data);
}

export function DeleteTechnology(id) {
    return BaseService.delete(`api/technology/delete/${id}`);
}

export function DeleteSubtechnology(id) {
    return BaseService.delete(`api/subTechnology/delete/${id}`);
}
