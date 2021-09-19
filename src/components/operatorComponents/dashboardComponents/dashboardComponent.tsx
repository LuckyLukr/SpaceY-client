import jwt_decode from 'jwt-decode';
import {
    Typography,
    Grid,
    makeStyles
} from '@material-ui/core';

import Navbar from '../../navbarComponents/navbarComponent';
import AccessDenied from '../../accessDeniedComponent';
import OperatorDashboard from './operatorDashboard';
import AstronautDashboard from './astronautDashboard';
import UnderConstruction from '../../underConstructionComponent';

const useStyles = makeStyles(() => ({
    card: {
        width: '100%',
        marginTop: 50,
        padding: 20,
    },
    textarea: {
        width: '100%',
        padding: 40,
        backgroundColor: '#262626',
        color: 'white',
        marginTop: '43px',
    }
}))

export default function Dashboard( {
    onLogout, 
    onUpdate, 
    onSucces, 
    missions, 
    user,
    onMissionUpdate
}:any ) {
    const classes = useStyles();
    const tokenData = jwt_decode(user.access_token);

    return(
        <div>
            <UnderConstruction />
            <Navbar 
                onLogout={onLogout} 
                onUpdate={onUpdate} 
                onSucces={onSucces}
                user={user}
            />
            { 
                user.access_token ?
            <Grid container direction='column' justify='space-evenly' alignItems='center'>  
                
                <Grid container justify='space-between' alignItems='center' >
                    {
                        tokenData.role === 'operator' ? 
                            <OperatorDashboard missions={missions} onMissionUpdate={onMissionUpdate} />
                        :
                            <AstronautDashboard />
                    }
                    <Grid container justify='space-evenly' direction='column' alignItems='center' className={classes.textarea}>
                        <Typography variant='h5'>
                            About
                        </Typography>
                        <Typography style={{maxWidth: '350px'}}>
                        Web application simulating space program including CRUD operations with astronauts and 
                        spaceships through REST API and creating complex space missions based on different spaceships, 
                        astronauts and destinations like moon or Mars.
                        </Typography>
                        
                    </Grid>
                </Grid>
            </Grid>
            :
            <AccessDenied />
            }
        </div>
    )
}