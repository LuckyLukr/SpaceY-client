import React from 'react';
import { Grid, makeStyles, Typography } from '@material-ui/core';
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

function Loader() {
    const classes = useStyles();

    return (
        <Grid className={classes.root} container direction='column' justify='center' alignItems='center'>
            <img className={classes.yImg} src={logo} alt='Y' />
            <Typography variant='h5'>
                Just a moment
            </Typography>
        </Grid>
    )
}

export default Loader;