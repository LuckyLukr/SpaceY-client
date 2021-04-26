import React from 'react';
import { 
    Card,
    Grid,
    makeStyles,
    Typography,
    Button
} from '@material-ui/core';
import Table from './tableComponent';

import AccessDenied from '../../accessDeniedComponent';

const useStyles = makeStyles(()=>({
    root: {
        width: '80vw',
        minHeight: '75vh',
        margin: '5% 0%',
        padding: '10px',
        transition: '1s',
        textAlign: 'center',
        zIndex: 1,
    },
    addform: {
        maxWidth: 600,
        padding: '1%',
        margin: '2%',
    },
    addBtn: {
        margin: '10px 0px',
    }
}))

function Register( { users, onDelete}:any ) {
    const classes = useStyles();

    const token = JSON.parse(localStorage.token);

    return(
        <div>
        { 
        token ?
            <Grid container justify='center'>
                <Card elevation={10} className={classes.root}>
                    <Typography align='center' variant='h4' color='textSecondary' >
                        Spacecrafts
                    </Typography>
                    <Grid container >
                        <Button className={classes.addBtn} variant='outlined' color='primary' >
                            Add
                        </Button>
                    </Grid>

                    <Table users={users} onDelete={onDelete} />
                </Card>
            </Grid>
            :
            <AccessDenied />
        }
        </div>
    )
}

export default Register;