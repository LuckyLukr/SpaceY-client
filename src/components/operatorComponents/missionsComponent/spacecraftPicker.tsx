import { useState } from 'react';
import {
    makeStyles,
    Grid,
    Button,
    Card,
    CardMedia,
    Fab,
    Theme,
    Typography,
    TextField,
    InputAdornment
} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';

import MissionInfo from './missionInfo';
import { Spacecraft } from '../../../types';

import astronautsImg from '../../../images/two_astronauts_earth.jpg';
import fastreqImg from '../../../images/fastreq.jpg';
import falconImg from '../../../images/falcon.jpg';
import dinastyImg from '../../../images/spacecraft.jpg';

const useStyles = makeStyles((theme: Theme)=>({
    addBtn: {
        margin: '10px 0px',
    },
    addFormCard: {
        [theme.breakpoints.down('xs')]: {
            height: 650,
        },
        width: '96vw',
        marginTop: '3vh',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        display: 'flex',
        flexWrap: 'wrap',
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
        margin: '30px',
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
        width: '800px',
        minWidth: '200px',
        flexDirection: 'column',
        margin: '30px 0px'
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
    const [ filterName, setFilterName ] = useState<string>('');

    const classes = useStyles();

    const handleTargetChange = (e:Spacecraft) => setTarget(e);
    const handleNameChange = (e:string) => setFilterName(e);

    const filterSpacecraftName = () => spacecrafts.filter( (e:Spacecraft) => e.name.toLowerCase().includes(filterName.toLowerCase()));
    

    return(
        <Grid container direction='column' alignItems='center'>
                <Typography style={{marginTop: '15px'}} variant='h5' color='textSecondary' gutterBottom >Pick your spacecraft</Typography>
                <TextField 
                    id='name'
                    type='text'
                    value={filterName}
                    placeholder='Search by name'
                    onChange={(e)=> handleNameChange(e.target.value)}
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon color='action' />
                        </InputAdornment>
                        ),
                    }}
                />
 
            <Grid container className={classes.addFormCard}>
                <Card className={classes.picker} >
                    <Grid container direction='column' justify='center' className={classes.buttonGroup}>
                        {
                            filterSpacecraftName().map((e:Spacecraft) => (
                                        (e.status === 'Destroyed' || e.status.includes('on mission')) ?
                                            <Button
                                                key={e.id}
                                                className={classes.btn} 
                                                disabled
                                                variant='outlined'
                                            >
                                                {e.name} - {e.type}
                                            </Button>
                                        :
                                            <Button
                                                key={e.id}
                                                className={classes.btn} 
                                                color='primary'
                                                variant='outlined'
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
                    {
                        target.type === 'Fastreq 212' ?
                            <CardMedia image={fastreqImg} title={target.type} className={classes.cardMedia} />
                        : (target.type === 'Falcon 20' || target.type === 'Falcon 21') ?
                            <CardMedia image={falconImg} title={target.type} className={classes.cardMedia} />
                        : target.type === 'Dinasty 1' ?
                            <CardMedia image={dinastyImg} title={target.type} className={classes.cardMedia} /> 
                        :
                            <CardMedia image={astronautsImg} title={target.type} className={classes.cardMedia} />
                    }
                </Card>
                <MissionInfo assigned={assigned} target={target} name={name} />

                <Button
                    className={classes.backBtn}
                    variant='outlined' 
                    color='primary' 
                    onClick={() => onNameChange('')}
                >
                    <ArrowBackIosIcon />Back
                </Button>
            </Grid>
        </Grid>  
    )
}

export default SpacecraftPicker;