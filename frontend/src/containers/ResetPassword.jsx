import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {reset_password} from '../actions/auth';
import './../App.css'

const ResetPassword = ({reset_password, isAuthenticated}) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
    });

    const {email} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        reset_password(email);
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
                    <label htmlFor="email">Email</label>
                    <input
                        className = 'form-control'
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary for-login" type="submit">Reset Password</button>
                </div>
                
            </form>
            <p className="mt-3">
                Don't have an account? <Link to="/signup">Signup</Link>
            </p>
            <p className="mt-3">
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, {reset_password})(ResetPassword);