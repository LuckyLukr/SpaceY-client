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
        padding: '10px',
        transition: '1s',
        textAlign: 'center',
        zIndex: 1,
        animation: '$showUp 2.5s',
    },
    addBtn: {
        margin: '10px 0px',
    },
    addFormCard: {
        height: '87%',
        [theme.breakpoints.down('xs')]: {
            height: '91%',
        },
        maxWidth: '70%',
        marginTop: '62px',
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
    closeBtn: {
        borderRadius: '50%',
        minWidth: '40px',
        height: '40px',
    },
    titleContainer: {
        overflow: 'hidden',
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

function Register( {onAdd, spacecrafts, onDelete, onDestroy, user }:any ) {
    const [ appendForm, setAppendForm ] = useState<boolean>(false);

    const classes = useStyles();

    const onAppend = () => setAppendForm(!appendForm);
    const handleClickAway = () => setAppendForm(false);

    return(
        <div>
        { 
        user.access_token ?
            <Grid container justify='center' style={{overflow: 'hidden'}} >
                <Card elevation={0} className={classes.root}>
                    
                    <Grid container alignItems='center' justify='space-between' className={classes.titleContainer} >
                        <Button onClick={() => onAppend()} className={classes.addBtn} variant='outlined' color='primary' >
                            Add
                        </Button>
                        <Typography align='center' variant='h5' color='textSecondary' >
                            REGISTER OF SPACECRAFTS
                        </Typography>
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

                                <AddingForm onAdd={onAdd} onAppend={onAppend} spacecrafts={spacecrafts} /> 

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