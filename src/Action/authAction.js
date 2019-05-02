import * as authService from '../Services/authService';
import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL } from '../Reducer/authReducer';

export const RegisterUser = (credentials) => {
    return (dispatch) => {
        authService.SignUp(credentials)
            .then((response) => {
                if (response.status === 200) {
                    let fullname = response.data.user.firstName + " " + response.data.user.lastName;
                    dispatch({
                        type: REGISTER_SUCCESS,
                        data: {
                            fullName: fullname,
                            email: response.data.user.email,
                            userName: response.data.user.userName,
                            contactNo: response.data.user.contactNo
                        }
                    })
                }
            })
            .catch((error) => {
                if (error) {
                    dispatch({
                        type: REGISTER_FAIL,
                        register_error: error.response.data.error
                    });
                }
            })
    }
}

export const LoginUser = (credentials) => {
    return (dispatch) => {
        authService.Login(credentials)
            .then((response) => {
                if (response.status === 200) {
                    let fullname = response.data.user.firstName + " " + response.data.user.lastName;
                    dispatch({
                        type: LOGIN_SUCCESS,
                        data: {
                            fullName: fullname,
                            email: response.data.user.email,
                            userName: response.data.user.userName,
                            contactNo: response.data.user.contactNo
                        }
                    })
                }
            })
            .catch((error) => {
                if (error) {
                    dispatch({
                        type: LOGIN_FAIL,
                        register_error: error.response.data.error
                    });
                }
            })
    }
}