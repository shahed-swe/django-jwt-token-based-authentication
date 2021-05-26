import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {login} from '../actions/auth';

const Login = ({login}) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const {email, password} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        login(email, password)
    }
    // if the user is authenticated we will redirect the user to home page

    return (
        <div className="container mt-5">
            <h1>Sign in</h1>
            <p>Sign in to your account</p>
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
                    <label htmlFor="password">Password</label>
                    <input 
                        className="form-control"
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                        required
                    />

                </div>
                <div className="form-group">
                    <button className="btn btn-primary" type="submit">Login</button>
                </div>
                
            </form>
            <p className="mt-3">
                Don't have an account? <Link to="/signup">Signup</Link>
            </p>
            <p className="mt-3">
                Forgot password? <Link to="/reset_password">ResetPassword</Link>
            </p>
        </div>
    );
};

const mapStateToProps = state => ({
    // is authenticated ?
})
export default connect(null, {login})(Login);