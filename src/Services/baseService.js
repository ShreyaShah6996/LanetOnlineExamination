import axios from 'axios';
const baseUrl = "http://192.168.200.138:8087"
const BaseService = axios.create(
    {
        baseURL: baseUrl
    }
);

export default BaseService;