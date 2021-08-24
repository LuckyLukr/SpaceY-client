import {
    Typography,
    makeStyles,
    Theme,
    withStyles,
    CardMedia,
    Grid,
    Tooltip,
} from '@material-ui/core';

import fastreqImg from '../../../images/fastreq.jpg';
import falconImg from '../../../images/falcon.jpg';
import dinastyImg from '../../../images/spacecraft.jpg';
import astronautLogo from '../../../images/astronaut_logo.jpg'

const HtmlTooltip = withStyles((theme: Theme) => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }))(Tooltip);

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        maxWidth: '300px',
        alignSelf: 'flex-start'
    },
    cardMedia: {
        width: '200px',
        height: '100px',
        backgroundPositionY: '25%',
    },
    logo: {
        width: '35px',
        height: '35px',
    },
    carousel: {
        display: 'flex',
        flexWrap: 'nowrap',
        overflowY: 'scroll',
        borderLeft: 'solid 1px #80808080',
        borderRight: 'solid 1px #80808080',
    },
    item: {
        margin: '0px 4px',
        padding: 4,
    }
}))

function MissionInfo( { target, name, assigned }:any ) {
    const classes = useStyles();

    return (
        <Grid container direction='column' className={classes.root} alignItems='center' >
            <Typography gutterBottom variant='h5' >
                Mission: {name}
            </Typography>
            <Typography variant='h6' align='center' >
               Spacecraft
            </Typography>
            
            { target.type === 'Fastreq 212' && <CardMedia image={fastreqImg} title={target.type} className={classes.cardMedia} /> }
            { (target.type === 'Falcon 20' || target.type === 'Falcon 21') && <CardMedia image={falconImg} title={target.type} className={classes.cardMedia} /> }
            { target.type === 'Dinasty 1' && <CardMedia image={dinastyImg} title={target.type} className={classes.cardMedia} /> }

            <Typography>
                Name: {target.name}
            </Typography>
            <Typography>
                Model: {target.type}
            </Typography>
            <Typography>
                Seats: {target.seats}
            </Typography>
            <Typography>
                M.I.: {target.motorImpulse} Km / h
            </Typography>
            <Typography>
                Tank Capacity: {target.tankCapacity} l
            </Typography>
            <Typography>
                Tank Condition: {target.tankCondition} %
            </Typography>
            <Typography>
                Inspace fuel consumption: {target.fuelConsumption} l / 100 km
            </Typography>
            <Typography>
                BlastOff fuel combustion: {target.startCombustion} l / s
            </Typography>
            <Typography>
                Landing fuel combustion: {target.landingCombustion} l / s
            </Typography>
            <Typography>
                Fridge: {target.fridge} kg
            </Typography>
            <Typography gutterBottom>
                weight: {target.weight} t
            </Typography>

            <Typography variant='h6' align='center'>
                Astronauts
            </Typography>
            <Grid container justify='flex-start' className={classes.carousel}>
            {
                assigned.map((e:any) => (
                    <HtmlTooltip 
                        key={e.id} 
                        title={
                            <>
                            <Typography color="inherit">{e.firstName} {e.lastName}</Typography>
                            Age: {e.age}<br />
                            Weight: {e.weight}<br />
                            Consumption: {e.consum} per hour<br />
                            Availability: {e.onMission ? 'on mission' : 'avalible'}<br />
                            </>
                        }
                    >       
                        <Grid container alignItems='center' direction='column' className={classes.item}>
                            <CardMedia image={astronautLogo} className={classes.logo} />
                            <Typography>
                                    {e.lastName}
                            </Typography>
                        </Grid>
                    </HtmlTooltip>
                ))
            }
            </Grid>
        </Grid>
    )
}

export default MissionInfo;