import BaseService from './baseService';

export function GetCollege() {
    return BaseService.get('api/college/get/all');
}