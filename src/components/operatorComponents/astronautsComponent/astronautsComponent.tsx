import React from 'react';

import Navbar from '../../navbarComponent';
import OperatorNavbar from '../operatorNavbar';
import Register from './RegisterComponent';

export default function AstronautsTable( {users,onDelete}:any ) {

    return(
        <div>
            <Navbar />
            <OperatorNavbar />
            <Register users={users} onDelete={onDelete} />
        </div>
    )
}