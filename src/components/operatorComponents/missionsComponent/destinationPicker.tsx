import { useState } from 'react';
import {
    makeStyles,
    Grid,
    Button,
    Card,
    CardMedia,
    Chip,
    Theme
} from '@material-ui/core';

import DestinationContainer from './destinationComponent';
import { destinations } from '../../destinationsComponents/destinationsComponent';
import { Destination } from '../../../types';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import LanguageIcon from '@material-ui/icons/Language';
import MissionInfo from './missionInfo';
import solarSystem from '../../../images/solar_system.jpg';

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
        backgroundColor: '#0a0a0a',
    },
    cardMedia: {
        width: '100%',
        height: '100%',
        backgroundPositionY: '25%',
        marginTop: '-25px'
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    btnGroup: {
        width: '100%',
        height: '100%',
        marginTop: '18px',
        gap: '10px',
    }
}))



export default function DestinationPicker( {assigned, name, spacecraft, onRemove, onDestinationChange, onMissionChange, travelTime}:any ) {
    const [ appendForm, setAppendForm ] = useState<boolean>(false);
    const [ destination, setDestination ] = useState<Destination>(Object);

    const classes = useStyles();

    const handleAppend = () => setAppendForm(!appendForm);

    const handleClickAway = () => setAppendForm(false);

    const handleDestination = (dest:Destination) => {
        setDestination(dest);
        onDestinationChange(dest);
        handleAppend();
    }

    return(
        <Grid container className={classes.addFormCard}>

            <MissionInfo target={spacecraft} name={name} assigned={assigned} />
            
                <Button
                    className={classes.backBtn}
                    variant='outlined' 
                    color='primary' 
                    onClick={() => onRemove()}
                >
                    <ArrowBackIosIcon />Back
                </Button>

                <Card className={classes.picker} >
                    
                    <CardMedia image={solarSystem} title='' className={classes.cardMedia} >
                        <Grid container direction='row' justify='center' alignItems='flex-end' className={classes.btnGroup} >
                            {
                                destinations.map( e => (
                                    <Chip
                                        key={e.name}
                                        label={e.name} 
                                        variant='default'
                                        icon={<LanguageIcon />}
                                        color='primary'
                                        onClick={()=> handleDestination(e)}
                                    />
                                ))
                            }
                        </Grid>
                        { 
                        appendForm && 
                            <DestinationContainer 
                                destination={destination} 
                                onAppend={handleAppend} 
                                clickAway={handleClickAway}
                                assigned={assigned}
                                spacecraft={spacecraft}
                                onMissionChange={onMissionChange}
                                travelTime={travelTime}
                            /> 
                        }
                    </CardMedia>
                </Card>
        </Grid>
    )
}