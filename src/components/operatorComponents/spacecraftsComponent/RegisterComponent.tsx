import React, {useState} from 'react';
import { 
    Card,
    Grid,
    makeStyles,
    Typography,
    Button,
    Tooltip,
    ClickAwayListener
} from '@material-ui/core';
import Table from './tableComponent';
import CloseIcon from '@material-ui/icons/Close';

import AccessDenied from '../../accessDeniedComponent';
import AddingForm from './addFormComponent';

const useStyles = makeStyles((theme)=>({
    root: {
        width: '80vw',
        minHeight: '75vh',
        margin: '5% 0%',
        padding: '10px',
        transition: '1s',
        textAlign: 'center',
        zIndex: 1,
    },
    addBtn: {
        margin: '10px 0px',
    },
    addFormCard: {
        height: 430,
        [theme.breakpoints.down('xs')]: {
            height: 650,
        },
        maxWidth: 600,
        padding: '2%',
        marginTop: '100px',
    },
    addFormRoot: {
        width: '100%',
        height: '120%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 200,
        backgroundColor: '#00000070',
    },
    closeBtn: {
        borderRadius: '50%',
        minWidth: '40px',
        height: '40px',
        marginTop: '-20px',
        marginRight: '-20px',
        [theme.breakpoints.down('xs')]: {
            marginTop: '-10px',
            marginRight: '-10px',
        },
    }
    
}))

function Register( {onAdd, spacecrafts, onDelete, onDestroy }:any ) {
    const [ appendForm, setAppendForm ] = useState(false);
    const classes = useStyles();

    const token = JSON.parse(localStorage.token);

    const onAppend = () => setAppendForm(!appendForm);
    const handleClickAway = () => setAppendForm(false);

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
                        <Button onClick={() => onAppend()} className={classes.addBtn} variant='outlined' color='primary' >
                            Add
                        </Button>
                    </Grid>

                    {appendForm && 
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

                                <AddingForm onAdd={onAdd} onAppend={onAppend} /> 

                            </Card>
                        </ClickAwayListener>  
                    </Grid>
                    }

                    <Table onDestroy={onDestroy} spacecrafts={spacecrafts} onDelete={onDelete} />
                </Card>
            </Grid>
            :
            <AccessDenied />
        }
        </div>
    )
}

export default Register;