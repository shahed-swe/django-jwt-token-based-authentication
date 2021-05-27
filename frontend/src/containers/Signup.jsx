import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {signup} from '../actions/auth';
import './../App.css'

const Signup = ({signup, isAuthenticated}) => {
    const [accountCreated, setAccountCreated] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        re_password: ''
    });

    const {name, email, password, re_password} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        if(password == re_password){
            signup(name, email, password, re_password);
            setAccountCreated(true);
        }
        
    }
    
    

    if(isAuthenticated){
        return <Redirect to="/"/>
    }
    if(accountCreated){
        return <Redirect to="/login"/>
    }

    return (
        <div className="container mt-5">
            <h1>Sign Up</h1>
            <p>Register for your new account</p>
            <form onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        className = 'form-control'
                        type="text"
                        placeholder="Enter your name"
                        name="name"
                        value={name}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Email:</label>
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
                    <label htmlFor="re_password">Confirm Password</label>
                    <input 
                        className="form-control"
                        type="password"
                        placeholder="Confirm Password"
                        name="re_password"
                        value={re_password}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary for-login" type="submit">Sign Up</button>
                </div>
                
            </form>
            <p className="mt-3">
                Already have an account? <Link to="/login">Signup</Link>
            </p>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, {signup})(Signup);