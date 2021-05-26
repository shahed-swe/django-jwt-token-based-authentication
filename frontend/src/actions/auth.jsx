import axios from 'axios';
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOAD_SUCCESS,
    USER_LOAD_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAILED,
    LOGOUT
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
}


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


export const login = (email, password) => async dispatch =>{
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({email, password});
    console.log(body)
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


export const logout = () => async dispatch => {
    dispatch({
        type: LOGOUT
    })
}