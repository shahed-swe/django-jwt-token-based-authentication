import React, {useEffect} from 'react';
import Navbar from '../components/Navbav';
import {connect} from 'react-redux';
import {checkauthenticated, load_user} from '../actions/auth';


const Layout = (props) => {
    useEffect(() => {
        props.checkauthenticated();
        props.load_user();
    }, []);


    return (
        <div>
            <Navbar/>
            {props.children}
        </div>
    )
}

export default connect(null, {checkauthenticated, load_user})(Layout);