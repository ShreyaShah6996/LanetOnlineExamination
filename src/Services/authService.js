import BaseService from './baseService';

export function SignUp(signUpCredential) {
    return BaseService.post('/auth/signup', signUpCredential);
}

export function Login(loginCredential) {
    return BaseService.post('/auth/login', loginCredential);
}