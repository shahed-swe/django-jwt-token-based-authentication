import React from 'react';

import Navbar from '../components/Navbav';

const Layout = (props) => (
    <div>
        <Navbar/>
        {props.children}
    </div>
)
export default Layout;