import React, { useState } from 'react';
import { 
    Card,
    Grid,
    makeStyles,
    Typography,
    Button,
    Tooltip,
    ClickAwayListener,
} from '@material-ui/core';
import Table from './tableComponent';
import { useTranslation } from 'react-i18next';

import CloseIcon from '@material-ui/icons/Close';
import AddingForm from './registerFormComponent';
import SuccessBar from '../../confirmationComponents/successBarComponent';

const useStyles = makeStyles((theme)=>({
    root: {
        width: '80vw',
        minHeight: '75vh',
        padding: '10px',
        transition: '1s',
        textAlign: 'center',
        zIndex: 1,
        animation: '$showUp 2.5s',
    },
    addFormCard: {
        height: '83%',
        [theme.breakpoints.down('xs')]: {
            height: '91%',
        },
        maxWidth: '600px',
        marginTop: '62px',
        padding: '1%'
    },
    addFormRoot: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 200,
        backgroundColor: '#00000070',
    },
    addBtn: {
        margin: '10px 0px',
    },
    closeBtn: {
        borderRadius: '50%',
        minWidth: '40px',
        height: '40px',
    },
    "@keyframes showUp": {
        '0%': {
          marginRight: '-300%',
        },
        '100%': {
          marginRight: '0%',
        },
    },
}))


function Register( { users, onDelete, onAdd, onUpdate, onSuccess, isSuccess, error, clearError }:any ) {
    const [ appendForm, setAppendForm ] = useState(false);
    const classes = useStyles();
    const { t } = useTranslation();

    const onAppend = () => setAppendForm(!appendForm);
    const handleClickAway = () => setAppendForm(false);

    return(
        
            <Grid container justify='center'>
                { isSuccess && <SuccessBar text={t('successRegistration')} /> }
                <Card elevation={0} className={classes.root}>

                    <Grid container alignItems='center' justify='space-between' >
                        <Button onClick={() => onAppend()} className={classes.addBtn} variant='outlined' color='primary' >
                            {t('astronauts.add')}
                        </Button>
                        <Typography align='center' variant='h5' color='textSecondary' >
                        {t("astronauts.tableTitle")}
                    </Typography>
                    </Grid>

                    { appendForm 
                    &&
                    <Grid className={classes.addFormRoot} container justify='center'>   
                        <ClickAwayListener onClickAway={handleClickAway}>        
                            <Card elevation={0} className={classes.addFormCard}>

                                <Grid container justify='flex-end'>
                                    <Tooltip title='Close' >
                                        <Button className={classes.closeBtn} onClick={()=> onAppend()} variant='text' color='primary'>
                                            <CloseIcon />
                                        </Button>
                                    </Tooltip>
                                </Grid>

                                <AddingForm 
                                    onAdd={onAdd} 
                                    onAppend={onAppend}
                                    users={users}                
                                    error={error} 
                                    clearError={clearError}
                                    onSuccess={onSuccess}
                                /> 

                            </Card>
                        </ClickAwayListener>  
                    </Grid>  
                    }

                    <Table onUpdate={onUpdate} onSucces={onSuccess} users={users} onDelete={onDelete} />

                </Card>
            </Grid>
    )
}

export default Register;