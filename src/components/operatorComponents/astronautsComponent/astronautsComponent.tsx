import jwt_decode from 'jwt-decode';

import Navbar from '../../navbarComponents/navbarComponent';
import Register from './RegisterComponent';
import AccessDenied from '../../accessDeniedComponent';

export default function AstronautsTable( { onAdd, users, onDelete, onLogout, onUpdate, onSuccess, isSuccess, user, error, clearError}:any ) {
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
                onSucces={onSuccess}
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
                    isSuccess={isSuccess}
                    onSuccess={onSuccess}
                    error={error} 
                    clearError={clearError} 
                />
                :
                <AccessDenied />
            }
        </div>
    )
}