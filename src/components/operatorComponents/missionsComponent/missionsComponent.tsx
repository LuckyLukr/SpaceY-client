import jwt_decode from 'jwt-decode';

import Navbar from '../../navbarComponents/navbarComponent';
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
    missions,
    onMissionUpdate
}:any ) {
    const token = user.access_token;
    let tokenData = {role: ''};
    if(token){
        tokenData = jwt_decode(token);
    }

    return(
        <div>
        <UnderConstruction />
        <Navbar 
                onLogout={onLogout} 
                onUpdate={onUserUpdate} 
                onSucces={onSucces}
                user={user}
            />
        { 
            tokenData.role === 'operator'
            ?
            <MissionMaker
                user={user}
                users={users} 
                spacecrafts={spacecrafts} 
                addMission={addMission}
                onUserUpdate={onUserUpdate}
                onMissionUpdate={onMissionUpdate}
                onSpacecraftUpdate={onSpacecraftUpdate}
                missions={missions}
            />
            :
            <AccessDenied />
        }
    </div>
    )
}