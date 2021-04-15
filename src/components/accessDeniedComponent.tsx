import React from 'react';
import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import logo from '../images/Y_black.png';

const useStyles = makeStyles(()=>({
    root: {
        width: '100%',
        height: '100vh',
    },
    yImg: {
        width: '160px',
    }
}))

function AccessDenied() {
    const classes = useStyles();

    return (
        <Grid className={classes.root} container direction='column' justify='center' alignItems='center'>
            <img className={classes.yImg} src={logo} alt='Y' />
            <Typography variant='h5'>
                ACCESS DENIED
            </Typography>
            <Typography gutterBottom > Please log in or sign up.</Typography>
            <Button
                href='/'
                style={{margin: 10}} 
                variant='contained' 
            >
                Go back
            </Button>
        </Grid>
    )
}

export default AccessDenied;