import jwt_decode from 'jwt-decode';

import Navbar from '../../navbarComponent';
import OperatorNavbar from '../../navbarComponents/operatorNavbar';
import Register from './RegisterComponent';
import AccessDenied from '../../accessDeniedComponent';

export default function SpacecraftTable( {onAdd, spacecrafts, onLogout, onDelete, onDestroy, onUpdate, onSucces}:any ) {
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
                onAdd={onAdd} 
                spacecrafts={spacecrafts} 
                onDelete={onDelete} 
                onDestroy={onDestroy} 
            />
        </>
            :
            <AccessDenied />
        }
    </div>
    )
}