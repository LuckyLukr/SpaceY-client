import { 
    Card,
    Grid,
    makeStyles,
    Typography,
    Button,
    Tooltip,
    ClickAwayListener,
    Fab,
    CardMedia
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import { User } from '../../../types';

const useStyles = makeStyles((theme)=>({
    root: {
        width: '50vw'
    },
    addFormCard: {
        height: '87%',
        [theme.breakpoints.down('xs')]: {
            height: '91%',
        },
        maxWidth: '70%',
        marginTop: '62px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between'
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
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    image: {
        width: '100%',
        height: '265px',
    }
}))



export default function DestinationContainer( {
    destination,
    onAppend,
    clickAway,
    assigned,
    spacecraft,
    onMissionChange,
    travelTime,
    travelHours
}:any ) {
    const classes = useStyles();

    const calcTotalWeight = () => {
        const astronautsWeight = assigned.map((e:User) => e.weight);
        const reducer = (acc:number, val:number) => acc + val;
        const totalWeight = (spacecraft.weight * 1000) + astronautsWeight.reduce(reducer);
        return totalWeight;
    }

    const calcFuelNeeded = () => {
        const consumption = spacecraft.fuelConsumption / 100;
        const start = spacecraft.startCombustion * 60;
        const landing = spacecraft.landingCombustion * 60;
        return (consumption * destination.distance) + (start + landing);
    }

    const caclApetit = () => {
        const astronautsApetit = assigned.map((e:User) => e.consum);
        const reducer = (acc:number, val:number) => acc + val;
        const totalApetit = astronautsApetit.reduce(reducer) * travelHours();
        return totalApetit
    }

    const calcCrewApetit = () => {
        const kilos = Math.floor(caclApetit() / 1000);
        const grams = caclApetit() % 1000;

        if (kilos === 0) {
            return `${grams} g`
        } else {
            return `${kilos} kg ${grams} g`;
        }
    }

    return(
        <Grid className={classes.addFormRoot} container justify='center'>   
            <ClickAwayListener onClickAway={clickAway}>        
                <Card elevation={0} className={classes.addFormCard}>
                    <Grid container justify='flex-end'>
                        <Tooltip title='Close' >
                            <Button className={classes.closeBtn} onClick={()=> onAppend()} variant='text' color='primary'>
                                <CloseIcon />
                            </Button>
                        </Tooltip>
                    </Grid>
                    
                    <Grid container direction='column' className={classes.root} alignItems='center' >
                        <Typography variant='h4' color='primary' gutterBottom>
                            Road to {destination.name}
                        </Typography>
                        <Typography>
                            Distance: {destination.distance.toLocaleString()} km
                        </Typography>
                        <Typography>
                            Fuel tank capacity: {spacecraft.tankCapacity.toLocaleString()} l
                        </Typography>
                        {
                            calcFuelNeeded() > spacecraft.tankCapacity ? 
                            <Typography color='error' variant='h6' >
                                Fuel needed: {calcFuelNeeded().toLocaleString()} l
                            </Typography>
                            :
                            <Typography>
                                Fuel needed: {calcFuelNeeded().toLocaleString()} l
                            </Typography>
                            
                        }
                        <Typography>
                            Fridge capacity: {spacecraft.fridge} kg
                        </Typography>
                        {
                            (caclApetit() / 1000) > spacecraft.fridge ? 
                            <Typography color='error' variant='h6'>
                                Food needed: {calcCrewApetit()}
                            </Typography>
                            :
                            <Typography>
                                Food needed: {calcCrewApetit()}
                            </Typography>
                        }
                        <Typography>
                            Total weight: {calcTotalWeight().toLocaleString()} kg
                        </Typography>
                        <Typography>
                            Time: {travelTime()}
                        </Typography>
                    </Grid>

                    <Grid container justify='center'>
                        {
                            calcFuelNeeded() > spacecraft.tankCapacity || (caclApetit() / 1000) > spacecraft.fridge ? 
                            <Fab
                                variant="extended"
                                color='default'
                                style={{marginBottom: '-4%'}}
                                onClick={() => alert('Error')}
                            >
                                <NavigateNextIcon className={classes.extendedIcon} />
                                Ready to start
                            </Fab>
                            :
                            <Fab
                                variant="extended"
                                color='primary'
                                style={{marginBottom: '-4%'}}
                                onClick={() => onMissionChange()}
                            >
                                <NavigateNextIcon className={classes.extendedIcon} />
                                Ready to start
                            </Fab>
                        }

                        <CardMedia image={destination.image} className={classes.image} />
                    </Grid>

                </Card>
            </ClickAwayListener>  
        </Grid>
    )
}