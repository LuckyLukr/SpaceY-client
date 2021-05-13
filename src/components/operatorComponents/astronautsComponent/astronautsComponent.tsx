import React from 'react';
import jwt_decode from 'jwt-decode';

import Navbar from '../../navbarComponent';
import OperatorNavbar from '../../navbarComponents/operatorNavbar';
import Register from './RegisterComponent';
import AccessDenied from '../../accessDeniedComponent';

export default function AstronautsTable( { onAdd, users, onDelete, onLogout, onUpdate, onSucces}:any ) {
    const token = JSON.parse(localStorage.token);
    let tokenData = {role: ''};
    if(token){
        tokenData = jwt_decode(token);
    }


    return(
        <div>
            <Navbar />
            { 
                tokenData.role === 'operator'
                ?
            <>
                <OperatorNavbar 
                    onLogout={onLogout} 
                    onUpdate={onUpdate} 
                    onSucces={onSucces} 
                />
                <Register 
                    onUpdate={onUpdate}
                    onAdd={onAdd} 
                    users={users} 
                    onDelete={onDelete} 
                    onSucces={onSucces} 
                />
            </>
                :
                <AccessDenied />
            }
        </div>
    )
}