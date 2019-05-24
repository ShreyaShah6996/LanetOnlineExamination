import * as authService from '../Services/authService';
import {LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../Reducer/authReducer';

export const RegisterUser = (credentials) => {
    return (dispatch) => {
        authService.SignUp(credentials)
            .then((response) => {
                if (response.status === 200) {
                    let LoginData = {
                        email: credentials.email,
                        password: credentials.password
                    }
                    authService.Login(LoginData)
                        .then((res) => {
                            if (res.status === 200) {
                                let fullname = res.data.user.firstName + " " + res.data.user.lastName;
                                localStorage.setItem("token", res.data.user.token)
                                localStorage.setItem("role", res.data.user.role)
                                localStorage.setItem("name", fullname)
                                localStorage.setItem("userId", res.data.user.userId)
                                dispatch({
                                    type: LOGIN_SUCCESS,
                                    data: res.data.user
                                })
                            }
                        })
                }
            })
            .catch((error) => {
                if (error) {
                    dispatch({
                        type: LOGIN_FAIL,
                        login_error: error.response.data.error
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
                    localStorage.setItem("token", response.data.user.token)
                    localStorage.setItem("role", response.data.user.role)
                    localStorage.setItem("name", fullname)
                    localStorage.setItem("userId", response.data.user.userId)
                    dispatch({
                        type: LOGIN_SUCCESS,
                        data: response.data.user
                    })
                }
            })
            .catch((error) => {
                if (error) {
                    dispatch({
                        type: LOGIN_FAIL,
                        login_error: error.response.data.error
                    });
                }
            })
    }
}

export const logoutUser = () => {
    return (dispatch) => {
        dispatch({
            type: LOGOUT
        });
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        localStorage.removeItem("name");
    }
};