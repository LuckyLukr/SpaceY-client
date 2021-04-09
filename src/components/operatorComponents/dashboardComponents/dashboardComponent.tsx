import React from 'react';
import {
    Typography,
    Grid,
    Card,
    makeStyles,
    Divider
} from '@material-ui/core';

import Navbar from '../../navbarComponent';
import OperatorNavbar from '../operatorNavbar';
import VerticalTabs from './verticalTabsComponent';

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

export default function OperatorDashboard() {
    const classes = useStyles();

    return(
        <div>
            <Navbar />
            <OperatorNavbar />
            <Grid container direction='column' justify='space-evenly' alignItems='center'>
                <Typography>
                    WELCOME {'{username}'}!
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
        </div>
    )
}