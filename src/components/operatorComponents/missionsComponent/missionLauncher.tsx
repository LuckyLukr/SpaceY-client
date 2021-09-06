import { useState } from 'react';
import { 
    Grid,
    Typography
} from "@material-ui/core"

import MissionInfo from "./missionInfo"
import { User } from '../../../types';


export default function MissionLauncher({ 
    mission, 
    onMissionChange, 
    spacecraft, 
    name, 
    assigned, 
    addMission,
    onUserUpdate,
    onSpacecraftUpdate
}:any) {
    const [ launching, setLaunching ] = useState(false);

    const handleCrewUpdate = () => {
        assigned.forEach( (e:User) =>{ 
            e.status = `on mission "${mission.name}"`
            onUserUpdate(e.id, e);
        });
    }

    const handleSpacecraftUpdate = () => {
        spacecraft.status = `on mission "${mission.name}"`
        onSpacecraftUpdate(spacecraft.id, spacecraft);
    }

    const handleLaunch = () => {
        handleCrewUpdate();
        handleSpacecraftUpdate();
        addMission(mission);
        setLaunching(true);
        setTimeout(()=>{
            setLaunching(false);
            window.open('/makeMission', '_self');
        }, 3000)
    }

    const blastOffDate = new Intl.DateTimeFormat('en-GB', {
        year: "numeric",
        month: "numeric",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    }).format(mission.blastOff)

    const landingDate = new Intl.DateTimeFormat('en-GB', {
        year: "numeric",
        month: "numeric",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    }).format(mission.landing)

    return (
        <Grid container justify='space-evenly'>
            <MissionInfo target={spacecraft} name={name} assigned={assigned} />

            {
                launching ?
                <Typography variant='h3' color='error' > LAUNCHING </Typography>
                :
                <Grid>
                    <p>Destination: {mission.destination}</p>
                    <p>Spacecraft: {spacecraft.type}</p>
                    <p>Astronauts on board: {mission.astronauts.length}</p>
                    <p>Status: {mission.status}</p>
                    <p>Blast off: {blastOffDate}</p>
                    <p>Landing time: {landingDate}</p>
                    <p>Distance: {mission.distance.toLocaleString()} km</p>
                    <p>Mission time: {mission.time}</p>
                    <br />
                    <button 
                        style={{backgroundColor: 'red', padding: '15px'}}
                        onClick={() => handleLaunch()}
                    >
                        LAUNCH
                    </button>
                    <br />
                    <button onClick={() => onMissionChange({})}>
                        BACK
                    </button>
                </Grid>
            }


        </Grid>
    )
}