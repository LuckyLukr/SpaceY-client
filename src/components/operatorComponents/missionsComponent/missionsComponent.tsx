import jwt_decode from 'jwt-decode';

import Navbar from '../../navbarComponent';
import OperatorNavbar from '../../navbarComponents/operatorNavbar';
import MissionMaker from './missionMaker';
import AccessDenied from '../../accessDeniedComponent';
import UnderConstruction from '../../underConstructionComponent';

export default function Missions( {
    user, 
    users, 
    spacecrafts, 
    onUserUpdate,
    onSpacecraftUpdate, 
    onSucces, 
    onLogout, 
    addMission,
    missions
}:any ) {
    const token = JSON.parse(localStorage.token);
    let tokenData = {role: ''};
    if(token){
        tokenData = jwt_decode(token);
    }


    return(
        <div>
        <UnderConstruction />
        <Navbar />
        { 
            tokenData.role === 'operator'
            ?
        <>
            <OperatorNavbar 
                onUserUpdate={onUserUpdate} 
                onSucces={onSucces} 
                onLogout={onLogout} 
            />
            <MissionMaker
                user={user}
                users={users} 
                spacecrafts={spacecrafts} 
                addMission={addMission}
                onUserUpdate={onUserUpdate}
                onSpacecraftUpdate={onSpacecraftUpdate}
                missions={missions}
            />
        </>
            :
            <AccessDenied />
        }
    </div>
    )
}