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
import SpacecraftNamer from './spacecraftNamer';
import DestinationPicker from './destinationPicker';

import logo from '../../../images/Y_black.png';

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        height: '60vh',
    },
    logo: {
        position: 'absolute',
        width: '550px',
        opacity: 0.04,
        marginTop: '10vh',
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

export default function MissionMaker( {user, users, spacecrafts}:any ) {
    const [ name, setName ] = useState<string>(String);
    const [ spacecraft, setSpacecraft ] = useState<Spacecraft>(Object);
    const [ assigned, setAssigned ] = useState<User[]>(Array);
    const [ destination, setDestination ] = useState<Destination[]>(Array)
    
    const astronauts = users.filter((e:any)=> e.role === 'astronaut');
    const classes = useStyles();

    const handleAssign = (e:User[]) => setAssigned(e);

    const handleRemoveAssigned = (e:User[]) => setAssigned([]);

    const handleNameChange = (e:string) => setName(e);

    const handleSpacecraftChange = (e:Spacecraft) => setSpacecraft(e);

    return(
        <Grid container justify='center' alignItems='center' className={classes.root}>
            <img src={logo} alt={logo} className={classes.logo} />

            <Grid container justify='space-evenly' alignItems='center' >
                
                {
                    !name &&
                    <SpacecraftNamer
                        user={user}
                        onNameChange={handleNameChange}
                    />
                }

                {
                    (name && spacecraft.id === undefined ) &&
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
                    (spacecraft.id && assigned.length === 0 ) &&
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
                    assigned.length > 0 &&
                    <DestinationPicker
                        assigned={assigned}
                        name={name}
                        spacecraft={spacecraft}
                        destination={destination}
                        onRemove={handleRemoveAssigned}
                    />
                }

            </Grid>
        </Grid>
    )
}