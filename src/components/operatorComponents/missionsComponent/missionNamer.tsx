import { useState } from 'react';
import {
    Grid,
    Button,
    TextField,
    Typography,
    makeStyles
} from '@material-ui/core';

import OperatorDashboard from '../dashboardComponents/operatorDashboard';
import { Mission } from '../../../types';

const useStyles = makeStyles(() => ({
    missionMakerContainer: {
        marginTop: '40px',
    }
}))

function MissionNamer( {onNameChange, user, missions}:any ) {
    const [ name, setName ] = useState<string>(String);

    const classes = useStyles();

    const handleNameChange = (e:any) => setName(e.target.value);

    const existingNames = missions.data.map((e:Mission) => e.name);

    return(
        <Grid container direction='column' alignItems='center' spacing={4} className={classes.missionMakerContainer} >
            <Typography>
                Welcome to misson maker {user.user.firstName}
            </Typography>
            <Typography>
                Enter a name for your mission and start planning
            </Typography>
                <Grid item xs={12} sm={6}>
                {
                existingNames.find((e:string) => e === name) ?
                    <TextField
                        onChange={handleNameChange}
                        value={name}
                        name="name"
                        variant="outlined"
                        required
                        id="name"
                        label="NAME ALREADY EXISTS"
                        autoFocus
                        error
                    />
                :
                    <TextField
                        onChange={handleNameChange}
                        value={name}
                        name="name"
                        variant="outlined"
                        required
                        id="name"
                        label="Mission Name"
                        autoFocus
                    />
                }
                
                </Grid>
                {
                    (name.length < 3 || existingNames.find((e:string) => e === name)) ?
                        <Button 
                            variant='contained'
                            disabled
                        >
                            Start planning
                        </Button>
                    :
                        <Button 
                            variant='contained'
                            color='primary'
                            onClick={() => onNameChange(name)}
                        >
                            Start planning
                        </Button>
                }
            <OperatorDashboard missions={missions}/>
        </Grid>
    )
}

export default MissionNamer;