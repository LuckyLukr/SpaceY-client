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



export default function DestinationContainer( { onAppend, clickAway, destination, spacecraft, assigned }:any ) {
    const classes = useStyles();

    const calcTotalWeight = () => {
        const astronautsWeight = assigned.map((e:User) => e.weight);
        const reducer = (acc:number, val:number) => acc + val;
        const totalWeight = (spacecraft.weight * 1000) + astronautsWeight.reduce(reducer);
        return totalWeight;
    }

    const calcTravelHours = () => Math.round(destination.distance / spacecraft.motorImpulse );

    const calcTravelTime = () => {
        const totalDays = Math.floor(calcTravelHours() / 24);
        const hours = calcTravelHours() % 24;
        const years = Math.floor(totalDays / 365);
        const days = totalDays % 365;

        if(years === 0 && days === 0){
            return `${hours} hours`;
        } else if(years === 0) {
            return `${days} days ${hours} hours`;
        } else {
            return `${years} year ${days} days ${hours} hours`;
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
                            Fuel filling: {spacecraft.tankCapacity} l
                        </Typography>
                        <Typography>
                            Fridge filling: {spacecraft.fridge} %
                        </Typography>
                        <Typography>
                            Total weight: {calcTotalWeight()} kg
                        </Typography>
                        <Typography>
                            Time: {calcTravelTime()}
                        </Typography>
                    </Grid>

                    <Grid container justify='center'>
                        <Fab
                                variant="extended"
                                color='primary'
                                style={{marginBottom: '-4%'}}
                            >
                                <NavigateNextIcon className={classes.extendedIcon} />
                                Ready to start
                        </Fab>

                        <CardMedia image={destination.image} className={classes.image} />
                    </Grid>

                </Card>
            </ClickAwayListener>  
        </Grid>
    )
}