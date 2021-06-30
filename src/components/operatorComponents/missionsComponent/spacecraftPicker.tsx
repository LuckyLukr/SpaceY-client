import { useState } from 'react';
import {
    makeStyles,
    Grid,
    Button,
    Card,
    CardMedia,
    Fab,
    Theme
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import MissionInfo from './missionInfo';
import astronautsImg from '../../../images/two_astronauts.jpg';

import { Spacecraft } from '../../../types';

const useStyles = makeStyles((theme: Theme)=>({
    root: {
        minHeight: '75vh',
        padding: '10px',
        transition: '1s',
        textAlign: 'center',
        zIndex: 1,
    },
    addBtn: {
        margin: '10px 0px',
    },
    addFormCard: {
        [theme.breakpoints.down('xs')]: {
            height: 650,
        },
        width: '88vw',
        marginTop: '3vh',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        display: 'flex',
        flexWrap: 'nowrap',
    },
    closeBtn: {
        borderRadius: '50%',
        minWidth: '40px',
        height: '40px',
        position: 'absolute',
        top: '9vh',
        right: '10vw',
    },
    media: {
        width: '100%',
        height: '100%',
        backgroundPositionX: '10%',
    },
    btn: {
        margin: '1%',
    },
    backBtn: {
        position: 'absolute',
        bottom: '3vh',
        left: '18vw',
    },
    buttonGroup: {
        padding: '2%',
        height:' 300px',
        flexWrap: 'nowrap',
        overflowY: 'scroll',
    },
    picker: {
        height: '80vh',
        display: 'flex',
        alignItems: 'center',
        minWidth: '50vw',
        flexDirection: 'column',
    },
    cardMedia: {
        width: '100%',
        height: '261px',
        backgroundPositionY: '25%',
        marginTop: '-25px'
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
}))

function SpacecraftPicker( {spacecrafts, onSpacecraftChange, name, onNameChange, assigned}:any ) {
    const [ target, setTarget ] = useState<Spacecraft>(Object);

    const classes = useStyles();

    const handleTargetChange = (e:Spacecraft) => setTarget(e);

    return(
            <Grid container className={classes.addFormCard}>

                <MissionInfo assigned={assigned} target={target} name={name} />

                <Button
                    className={classes.backBtn}
                    variant='outlined' 
                    color='primary' 
                    onClick={() => onNameChange('')}
                >
                    Back
                </Button>

                <Card className={classes.picker} >
                    <Grid container direction='column' className={classes.buttonGroup}>
                        {
                            spacecrafts.map((e:any) => (
                                <Button 
                                    key={e.id} 
                                    className={classes.btn} 
                                    color='primary'
                                    onClick={()=> handleTargetChange(e)}
                                >
                                    {e.name} - {e.type}
                                </Button>
                            ))
                        }
                    </Grid>
                    
                    {
                        target.id === undefined ? 
                        <Fab
                            variant="extended" 
                            disabled
                        >
                            <AddIcon className={classes.extendedIcon} />
                            Pick
                        </Fab>
                        :
                        <Fab
                            variant="extended"
                            color='primary'
                            onClick={() => onSpacecraftChange(target)}
                        >
                            <AddIcon className={classes.extendedIcon} />
                            Pick
                        </Fab>
                    }
                    <CardMedia image={astronautsImg} title='' className={classes.cardMedia} />
                </Card>
            </Grid>
    )
}

export default SpacecraftPicker;