import React from 'react';
import {Link} from 'react-router-dom';

const Home = () => (
    <div className='container'>
        <div className='p-5 mb-4 bg-light rounded-3'>
        <div className='container-fluid py-5'>
            <h1 className='display-5 fw-bold'>Home Page</h1>
            <p className='col-md-8 fs-4'>Using a series of utilities, you can create this jumbotron, just like the one in previous versions of Bootstrap. Check out the examples below for how you can remix and restyle it to your liking.</p>
            <Link className='btn btn-primary btn-lg' to='/login' role='button'>Login</Link>
        </div>
        </div>
    </div>
)
export default Home;