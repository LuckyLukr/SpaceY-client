import jwt_decode from 'jwt-decode';

import Navbar from '../../navbarComponent';
import OperatorNavbar from '../../navbarComponents/operatorNavbar';
import MissionMaker from './missionMaker';
import AccessDenied from '../../accessDeniedComponent';

export default function Missions( {users, spacecrafts, onUpdate, onSucces, onLogout}:any ) {
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
                onUpdate={onUpdate} 
                onSucces={onSucces} 
                onLogout={onLogout} 
            />
            <MissionMaker 
                users={users} 
                spacecrafts={spacecrafts} 
            />
        </>
            :
            <AccessDenied />
        }
    </div>
    )
}