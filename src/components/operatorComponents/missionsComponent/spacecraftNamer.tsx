import { useState } from 'react';
import {
    Grid,
    Button,
    TextField,
    Typography
} from '@material-ui/core';

function SpacecraftNamer( {onNameChange, user}:any ) {
    const [ name, setName ] = useState<string>(String);

    const handleNameChange = (e:any) => setName(e.target.value);

    return(
        <Grid container direction='column' alignItems='center' spacing={10}>
            <Typography>
                Welcome to misson maker {user.user.firstName}
            </Typography>
            <Typography>
                Enter a name for your mission and start planning
            </Typography>
            <Grid item xs={12} sm={6}>
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
            </Grid>
            {
                name.length < 3 ?
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

        </Grid>
    )
}

export default SpacecraftNamer;