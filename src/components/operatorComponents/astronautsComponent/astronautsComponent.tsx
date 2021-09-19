import React from 'react';
import jwt_decode from 'jwt-decode';

import Navbar from '../../navbarComponents/navbarComponent';
import OperatorNavbar from '../../navbarComponents/operatorNavbar';
import Register from './RegisterComponent';
import AccessDenied from '../../accessDeniedComponent';

export default function AstronautsTable( { onAdd, users, onDelete, onLogout, onUpdate, onSucces, user}:any ) {
    const token = user.access_token;
    let tokenData = {role: ''};
    if(token){
        tokenData = jwt_decode(token);
    }

    return(
        <div>
            <Navbar 
                onLogout={onLogout} 
                onUpdate={onUpdate} 
                onSucces={onSucces}
                user={user}
            />
            { 
                tokenData.role === 'operator'
                ?
                <Register 
                    onUpdate={onUpdate}
                    onAdd={onAdd} 
                    users={users} 
                    onDelete={onDelete} 
                    onSucces={onSucces} 
                />
                :
                <AccessDenied />
            }
        </div>
    )
}