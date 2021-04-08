import React from 'react';

import Navbar from '../../navbarComponent';
import OperatorNavbar from '../operatorNavbar';
import Register from './RegisterComponent';

export default function AstronautsTable( {users}:any ) {

    return(
        <div>
            <Navbar />
            <OperatorNavbar />
            <Register users={users}/>
        </div>
    )
}