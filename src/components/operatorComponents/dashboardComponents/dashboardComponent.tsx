import React from 'react';
import {
    Typography,
    Grid,
    Card,
    makeStyles,
    Divider
} from '@material-ui/core';
//import jwt_decode from 'jwt-decode';

import Navbar from '../../navbarComponent';
import OperatorNavbar from '../../navbarComponents/operatorNavbar';
import VerticalTabs from './verticalTabsComponent';
import AccessDenied from '../../accessDeniedComponent';

const useStyles = makeStyles(() => ({
    card: {
        width: '100%',
        marginTop: 50,
        padding: 20,
    },
    textarea: {
        width: 'fit-content',
        padding: 40,
    }
}))

export default function OperatorDashboard( {onLogout, onUpdate, onSucces}:any ) {
    const classes = useStyles();

    const user = JSON.parse(localStorage.user);
    const token = JSON.parse(localStorage.token);
    /* let tokenData = {role: ''};
    if(token){
        tokenData = jwt_decode(token);
    }
    */
    return(
        <div>
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
                <Typography>
                    WELCOME {user.user.firstName}!
                </Typography>
                <Card className={classes.card}>
                    <Grid container justify='space-between'>
                    <VerticalTabs />
                    <Grid container justify='space-evenly' direction='column' alignItems='center' className={classes.textarea}>
                        <Typography variant='h5'>
                            Lorem Ipsum
                        </Typography>
                        <Divider variant='middle'/>
                        <Typography style={{maxWidth: '350px'}}>
                            Lorem ipsum dolor sit amet, 
                            consectetuer adipiscing elit. 
                            Phasellus et lorem id felis nonummy placerat. 
                            Sed elit dui, pellentesque a, faucibus vel, interdum nec, diam. Mauris suscipit, 
                            ligula sit amet pharetra semper, nibh ante cursus purus, vel sagittis velit mauris vel metus. 
                            Nam libero tempore, cum soluta nobis est eligendi optio 
                            cumque nihil impedit quo minus id quod maxime placeat facere possimus.
                        </Typography>
                    </Grid>
                    </Grid>
                    
                </Card>
            </Grid>
            </>
            :
            <AccessDenied />
            }
        </div>
    )
}