import jwt_decode from 'jwt-decode';

import Navbar from '../../navbarComponent';
import OperatorNavbar from '../../navbarComponents/operatorNavbar';
import Register from './RegisterComponent';
import AccessDenied from '../../accessDeniedComponent';

export default function SpacecraftTable( {onAdd, spacecrafts, onLogout, onDelete, onDestroy}:any ) {
    const token = JSON.parse(localStorage.token);
    const tokenData = jwt_decode(token);

    return(
        <div>
        <Navbar />
        { 
            tokenData.role === 'operator'
            ?
        <>
            <OperatorNavbar onLogout={onLogout} />
            <Register onAdd={onAdd} spacecrafts={spacecrafts} onDelete={onDelete} onDestroy={onDestroy} />
        </>
            :
            <AccessDenied />
        }
    </div>
    )
}