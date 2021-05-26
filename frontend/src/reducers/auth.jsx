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
    LOGOUT
} from '../actions/types';


const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null
};

export default function(state = initialState, action){
    const {type, payload} = action;

    switch(type){
        case AUTHENTICATED_SUCCESS:
            return{
                ...state,
                isAuthenticated: true
            }
        case AUTHENTICATED_FAILED:
            return{
                ...state,
                isAuthenticated: false
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access);
            return{
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh
            }
        case LOGIN_FAIL:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return{
                ...state,
                access:null,
                refresh: null,
                isAuthenticated: false,
                user: null,
            }
        case USER_LOAD_SUCCESS:
            return{
                ...state,
                user: payload,
            }
        case USER_LOAD_FAIL:
            return{
                ...state,
                user: null
            }
        case LOGOUT:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return{
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null
            }
        case PASSWORD_RESET_SUCCESS:
            return {
                ...state,
            }
        case PASSWORD_RESET_FAIL:
            return {
                ...state,
            }
        case PASSWORD_RESET_CONFIRM_SUCCESS:
            return {
                ...state,
            }
        case PASSWORD_RESET_CONFIRM_FAIL:
            return{
                ...state,
            }
        default:
            return state
    }
}