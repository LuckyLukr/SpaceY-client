import {
    Grid,
    Typography,
    Button,
    makeStyles
} from '@material-ui/core';

import { User, Spacecraft } from '../../../types';

import logo from '../../../images/Y_black.png';

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        height: '60vh',
    },
    logo: {
        position: 'absolute',
        width: '550px',
        opacity: 0.1,
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
    }
}))

export default function MissionMaker( {users, spacecrafts}:any ) {
    const classes = useStyles();

    return(
        <Grid container justify='center' alignItems='center' className={classes.root}>
            <Typography color='textSecondary' >
                MAKE SOME MISSIONS HERE! pick ROCKET, assign ASTRONAUTS, fill FRIDGE, fill FUEL TANKS, pick DESTINATIONS and LAUNCH!
            </Typography>
            <img src={logo} alt={logo} className={classes.logo} />

            <Grid container justify='space-evenly' alignItems='center' >

                <Grid container justify='flex-start' alignItems='center' direction='column' className={classes.grabContainer}>
                    {
                        users.map((e:User) => 
                            <Grid key={e.id} item className={classes.grabItem}>
                                <Typography >
                                    {e.firstName} {e.lastName}
                                </Typography>
                            </Grid>
                        )
                    }
                </Grid>

                <Grid container justify='flex-start' alignItems='center' direction='column' className={classes.grabContainer}>
                    {
                        spacecrafts.map((e:Spacecraft) => 
                            <Grid key={e.id} item className={classes.buttonItem}>
                                <Button variant='outlined' fullWidth >
                                    {e.name}
                                </Button>
                            </Grid>
                        )
                    }
                </Grid>

            </Grid>
        </Grid>
    )
}