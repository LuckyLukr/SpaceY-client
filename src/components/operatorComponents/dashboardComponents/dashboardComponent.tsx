import jwt_decode from 'jwt-decode';
import {
    Typography,
    Grid,
    makeStyles
} from '@material-ui/core';

import Navbar from '../../navbarComponent';
import OperatorNavbar from '../../navbarComponents/operatorNavbar';
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

export default function Dashboard( {onLogout, onUpdate, onSucces, missions}:any ) {
    const classes = useStyles();

    const user = JSON.parse(localStorage.user);
    const token = JSON.parse(localStorage.token);
    const tokenData = jwt_decode(token);

    return(
        <div>
            <UnderConstruction />
            <Navbar />
            { 
                user.access_token === token ?
            <>
            <OperatorNavbar 
                onLogout={onLogout} 
                onUpdate={onUpdate} 
                onSucces={onSucces} 
            />
            <Grid container direction='column' justify='space-evenly' alignItems='center'>  
                
                <Grid container justify='space-between' alignItems='center' >
                    {
                        tokenData.role === 'operator' ? 
                            <OperatorDashboard missions={missions} />
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
            </>
            :
            <AccessDenied />
            }
        </div>
    )
}