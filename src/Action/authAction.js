import * as authService from '../Services/authService';
import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../Reducer/authReducer';

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
                            // userName: response.data.user.userName,
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
                    localStorage.setItem("token", response.data.user.token)
                    localStorage.setItem("role", response.data.user.role)
                    localStorage.setItem("name", fullname)
                    localStorage.setItem("userId", response.data.user.userId)
                    // localStorage.setItem("userName", response.data.user.userName)
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
        // localStorage.removeItem("userName");
    }
};