import { useState } from 'react';
import {
    Grid,
    makeStyles,
} from '@material-ui/core';
import { 
    Spacecraft, 
    User, 
    Mission, 
    Destination 
} from '../../../types';

import SpacecraftPicker from './spacecraftPicker';
import AstronautsPicker from './astronautsPicker';
import MissionNamer from './missionNamer';
import DestinationPicker from './destinationPicker';
import MissionLauncher from "./missionLauncher";

import logo from '../../../images/Y_black.png';

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        height: '60vh',
    },
    logo: {
        position: 'fixed',
        width: '60vw',
        opacity: 0.03,
        marginTop: '15vh',
        zIndex: -1,
    },
    grabContainer: {
        width: '200px',
        border: '2px solid gray',
        height: '250px',
        overflowY: 'scroll',
        flexWrap: 'nowrap',
    },
    grabItem: {
        padding: '10px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#dedede',
        },
        width: '100%',
        margin: '1px 0px'
    },
    buttonItem: {
        margin: '1px 0px',
        width: '100%',
    },
    astronautsContainer: {
        border: '1px solid black',
        height: '200px',
        width: '160px',
        overflowY: 'scroll',
        display: 'flex',
        flexWrap: 'nowrap',
    }
}))

export default function MissionMaker( {
    user, 
    users, 
    spacecrafts, 
    addMission,
    onUserUpdate,
    onSpacecraftUpdate,
    missions,
    onMissionUpdate
}:any ) {
    const [ name, setName ] = useState<string>(String);
    const [ spacecraft, setSpacecraft ] = useState<Spacecraft>(Object);
    const [ assigned, setAssigned ] = useState<User[]>(Array);
    const [ destination, setDestination ] = useState<Destination>(Object);
    const [ mission, setMission ] = useState<Mission>(Object);
    
    const astronauts = users.filter((e:any)=> e.role === 'astronaut');
    const classes = useStyles();

    const handleAssign = (e:User[]) => setAssigned(e);

    const handleRemoveAssigned = (e:User[]) => setAssigned([]);

    const handleNameChange = (e:string) => setName(e);

    const handleSpacecraftChange = (e:Spacecraft) => setSpacecraft(e);

    const handleDestinationChange = (e:Destination) => setDestination(e);

    const calcTravelHours = () => Math.round(destination.distance / spacecraft.motorImpulse);

    const landingDate = new Date().setTime(new Date().getTime() + ( calcTravelHours() * 60 * 60 * 1000));

    const calcTravelTime = () => {
        const totalDays = Math.floor(calcTravelHours() / 24);
        const hours = calcTravelHours() % 24;
        const years = Math.floor(totalDays / 365);
        const days = totalDays % 365;

        if(years === 0 && days === 0){
            return `${hours} hours`;
        } else if(years === 0) {
            return `${days} days ${hours} hours`;
        } else {
            return `${years} year ${days} days ${hours} hours`;
        }
    }
    
    const handleMissionChange = (e?:any) => {
        const newMission = {
            id: 'generatedID',
            name: name,
            spacecraft: spacecraft,
            astronauts: assigned,
            status: 'launching',
            blastOff: new Date(),
            landing: landingDate,
            destination: destination.name,
            distance: destination.distance,
            time: calcTravelTime()
        }
        if (e) {
            setMission(e);
        } else {
            setMission(newMission);
        }
        
    }

    return(
        <Grid container justify='center' alignItems='center' className={classes.root}>
            <img src={logo} alt={logo} className={classes.logo} />

            <Grid container justify='space-evenly' alignItems='center' >
                
                {
                    !name &&
                    <MissionNamer
                        user={user}
                        onNameChange={handleNameChange}
                        missions={missions}
                        onMissionUpdate={onMissionUpdate}
                    />
                }

                {
                    ( name && spacecraft.id === undefined ) &&
                    <SpacecraftPicker
                        name={name}
                        spacecraft={spacecraft}
                        spacecrafts={spacecrafts}
                        assigned={assigned}
                        onSpacecraftChange={handleSpacecraftChange}
                        onNameChange={handleNameChange}
                    />
                }


                {
                    ( spacecraft.id && assigned.length === 0 ) &&
                    <AstronautsPicker 
                        astronauts={astronauts}
                        onAssign={handleAssign}
                        onRemove={handleRemoveAssigned}
                        assigned={assigned}
                        name={name}
                        spacecraft={spacecraft}
                        onSpacecraftChange={handleSpacecraftChange}
                    />
                }

                {
                    ( assigned.length > 0 && mission.id === undefined ) &&
                    <DestinationPicker
                        assigned={assigned}
                        name={name}
                        spacecraft={spacecraft}
                        destination={destination}
                        onRemove={handleRemoveAssigned}
                        onDestinationChange={handleDestinationChange}
                        onMissionChange={handleMissionChange}
                        travelTime={calcTravelTime}
                        travelHours={calcTravelHours}
                    />
                }

                {
                    mission.id && 
                        <MissionLauncher 
                            mission={mission}
                            onMissionChange={handleMissionChange}
                            assigned={assigned}
                            name={name}
                            spacecraft={spacecraft}
                            travelTime={calcTravelTime}
                            addMission={addMission}
                            onUserUpdate={onUserUpdate}
                            onSpacecraftUpdate={onSpacecraftUpdate}
                        />
                }

            </Grid>
        </Grid>
    )
}