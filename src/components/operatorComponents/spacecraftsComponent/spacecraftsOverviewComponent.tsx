import { 
    Grid, 
    Typography,
    makeStyles,
    CardMedia,
    Divider
} from "@material-ui/core";
import { Spacecraft } from "../../../types";
import { SCsArray } from "./factory";

const useStyles = makeStyles(() => ({
    root: {
        background: 'linear-gradient(180deg, rgba(46,46,46) 0%, rgba(0,0,0) 50%)',
        color: 'white',
        padding: '20px'
    },
    spacecraftContainer: {
        margin: '10px',
        padding: '10px',
    },
    spacecraftInfo: {
        width: 'max-content',
        opacity: 0.6
    },
    media: {
        width: '300px',
        height: '200px',
        opacity: 0.7,
    },
    divider: {
        margin: '50px',
    },
    title: {
        textAlign: 'center',
        fontSize: '50px',
        opacity: 0.3,
        fontFamily: 'Zen Dots, cursive',
        marginTop: '30px'
    }
}))

export default function SpacecraftOverview() {
    const classes = useStyles();

    return(
        <Grid container className={classes.root}>
            <Grid container direction='column' alignContent='center'>
                <Typography className={classes.title} >Spacecrafts overview</Typography>
                <Divider variant='middle' className={classes.divider} />
            </Grid>
            {
                SCsArray.map( (e:Spacecraft) => {
                    return  <Grid key={e.id} container direction='column' className={classes.spacecraftContainer}>
                                <Grid container justify='space-around' alignItems='center'>
                                    {
                                        (SCsArray.indexOf(e) % 2) === 0 ? 
                                            <Grid container direction='column'>
                                                <Grid container justify='space-around' alignItems='center'>
                                                    <CardMedia
                                                        className={classes.media}
                                                        image={e.img}
                                                        title={e.type}
                                                    />
                                                    <Grid container direction='column' className={classes.spacecraftInfo}>
                                                        <Typography className={classes.title} >{e.type.toLocaleUpperCase()} </Typography>
                                                        <Typography> Km/h: {e.motorImpulse.toLocaleString()} km </Typography>
                                                        <Typography> Fuel tank capacity: {e.tankCapacity.toLocaleString()} l </Typography>
                                                        <Typography> Start Combustion: {e.startCombustion.toLocaleString()} l/s</Typography>
                                                        <Typography> Landing Combustion: {e.landingCombustion.toLocaleString()} l/s</Typography>
                                                        <Typography> Seats: {e.seats} </Typography>
                                                        <Typography> Weight: {e.weight} t</Typography>
                                                    </Grid>
                                                </Grid>
                                                <Divider variant='middle' className={classes.divider} />
                                            </Grid>
                                        :
                                            <Grid container direction='column'>
                                                <Grid container justify='space-around' alignItems='center'>
                                                    <Grid container direction='column' className={classes.spacecraftInfo}>
                                                        <Typography className={classes.title} >{e.type.toLocaleUpperCase()} </Typography>
                                                        <Typography> Km/h: {e.motorImpulse.toLocaleString()} km </Typography>
                                                        <Typography> Fuel tank capacity: {e.tankCapacity.toLocaleString()} l</Typography>
                                                        <Typography> Start Combustion: {e.startCombustion.toLocaleString()} l/s</Typography>
                                                        <Typography> Landing Combustion: {e.landingCombustion.toLocaleString()} l/s</Typography>
                                                        <Typography> Seats: {e.seats} </Typography>
                                                        <Typography> Weight: {e.weight} t</Typography>
                                                    </Grid>  
                                                    <CardMedia
                                                        className={classes.media}
                                                        image={e.img}
                                                        title={e.type}
                                                    />
                                                </Grid>
                                                <Divider variant='middle' className={classes.divider} />
                                            </Grid>
                                    }
                                </Grid>
                            </Grid>
                })
            }
        </Grid>
    )
}