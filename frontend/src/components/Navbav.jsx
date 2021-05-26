import React, {Fragment} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../actions/auth';


const Navbar = ({logout, isAuthenticated}) => {
    const guestLinks = () => {
        return(
            <Fragment>
                <li className='nav-item'>
                    <Link className='nav-link' to="/login">Login</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to='/signup'>Signup</Link>
                </li>
        </Fragment>
        )
        
    };


    const authLinks = () => {
        return(
            <Fragment>
                <li className='nav-item'>
                    <Link className='nav-link' href="#!" onClick={logout}>Logout</Link>
                </li>
            </Fragment>
        )
    };


    return(
        <div>
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                <div className='container-fluid container'>
                    <Link className='navbar-brand' to="/">Authenticate</Link>
                    <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse' id='navbarNav'>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <Link className='nav-link active' aria-current='page' to="/">Home</Link>
                        </li>
                        {isAuthenticated ? authLinks() : guestLinks()}
                    </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, {logout})(Navbar);