import React from 'react';
import { 
    Card,
    Grid,
    makeStyles,
    Typography,
    Button
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
    addBtn: {
        margin: '10px 0px',
    }
}))

function Register( {users,onDelete}:any ) {
    const classes = useStyles();
    const { t } = useTranslation();

    return(
        <Grid container justify='center'>
            <Card elevation={10} className={classes.root}>
                <Typography align='center' variant='h4' color='textSecondary' >
                    {t("astronauts.tableTitle")}
                </Typography>
                <Grid container >
                    <Button className={classes.addBtn} variant='outlined' color='primary' >
                        Add
                    </Button>
                </Grid>

                <Table users={users} onDelete={onDelete} />
            </Card>
        </Grid>
    )
}

export default Register;