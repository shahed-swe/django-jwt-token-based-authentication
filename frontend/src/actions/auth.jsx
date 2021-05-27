import axios from 'axios';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOAD_SUCCESS,
    USER_LOAD_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAILED,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_CONFIRM_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAILED,
    LOGOUT,
} from './types';





export const checkauthenticated = () => async dispatch => {
    if (localStorage.getItem('access')){
        const config = {
            headers:{
                'Content-Type': 'application/json',
                'Accept':'application/json'
            }
        };

        const body = JSON.stringify({token: localStorage.getItem('access')});
        try{
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config)
            if(res.data.code !== 'token_not_valid'){
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                });
            }else{
                dispatch({
                    type: AUTHENTICATED_FAILED
                });
            }
        }catch(err){
            dispatch({
                type: AUTHENTICATED_FAILED
            });
        }
    }else{
        dispatch({
            type: AUTHENTICATED_FAILED 
        });
    }
};

export const load_user = () => async dispatch =>{
    if (localStorage.getItem('access')){
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };
        try{
            
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);
            dispatch({
                type: USER_LOAD_SUCCESS,
                payload: res.data
            })
        }catch(err){
            dispatch({
                type: USER_LOAD_FAIL
            })
        }

    }
    else{
        dispatch({
            type: USER_LOAD_FAIL
        });
    }
};

export const signup = (name, email, password, re_password) => async dispatch =>  {
    const config = {
        headers:{
            'Content-Type':'application/json',
        }
    };

    const body = JSON.stringify({name, email, password, re_password});

    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
    }catch(err){
        dispatch({
            type: SIGNUP_FAIL
        });
    }
}

export const verify = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type':'application/json',
        }
    }
    const body = JSON.stringify({uid, token});

    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config);
        dispatch({
            type: ACTIVATION_SUCCESS,
        });
    }catch(err){
        dispatch({
            type: ACTIVATION_FAILED,
        });
    }
}


export const login = (email, password) => async dispatch =>{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({email, password});
    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(load_user());
    }catch(err){
        dispatch({
            type: LOGIN_FAIL
        })
    }
};

export const reset_password = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({email});
    try{
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config);
        dispatch({
            type: PASSWORD_RESET_SUCCESS
        });
    } catch(err){
        dispatch({
            type: PASSWORD_RESET_FAIL
        });
    }
};

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    };

    const body = JSON.stringify({uid, token, new_password, re_new_password});

    try{
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);
        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS
        });
    }catch(err){
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        });
    }
};


export const logout = () => async dispatch => {
    dispatch({
        type: LOGOUT
    })
};

