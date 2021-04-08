import React from 'react';
import { 
    Card,
    Grid,
    makeStyles,
    Typography,
} from '@material-ui/core';
import Table from './tableComponent';
import { useTranslation } from 'react-i18next';

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
}))

function Register( {users}:any ) {
    const classes = useStyles();
    const { t } = useTranslation();

    return(
        <Grid container justify='center'>
            <Card elevation={10} className={classes.root}>
                <Typography align='center' variant='h4' color='textSecondary' >
                    {t("astronauts.tableTitle")}
                </Typography>

                <Table users={users} />
            </Card>
        </Grid>
    )
}

export default Register;