import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {reset_password_confirm} from '../actions/auth';
import './../App.css'

const ResetPasswordConfirm = ({match,reset_password_confirm, isAuthenticated}) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    });

    const {new_password, re_new_password} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();


        const uid = match.params.uid;
        const token = match.params.token;

        reset_password_confirm(uid, token, new_password, re_new_password);
        setRequestSent(true);
    }
    // if the user is authenticated we will redirect the user to home page
    if(requestSent){
        return <Redirect to="/"/>
    }

    if(isAuthenticated){
        return <Redirect to="/"/>
    }

    return (
        <div className="container mt-5">
            <h1>Reset Password</h1>
            <p>Forgot Password</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <label htmlFor="email">Password</label>
                    <input
                        className = 'form-control'
                        type="password"
                        placeholder="Enter Password"
                        name="new_password"
                        value={new_password}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Confirm Password</label>
                    <input
                        className = 'form-control'
                        type="password"
                        placeholder="Enter Confirm Password"
                        name="re_new_password"
                        value={re_new_password}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary for-login" type="submit">Reset Password</button>
                </div>
            </form>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, {reset_password_confirm})(ResetPasswordConfirm);