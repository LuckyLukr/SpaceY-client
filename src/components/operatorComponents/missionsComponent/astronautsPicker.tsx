import { useState } from 'react';
import {
    Grid,
    Typography,
    makeStyles,
    withStyles,
    Button,
    Tooltip,
    Theme,
    Fab,
} from '@material-ui/core';
import { User } from '../../../types';
import AddIcon from '@material-ui/icons/Add';

import MissionInfo from './missionInfo';

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
    astronautsContainer: {
        border: '1px solid black',
        height: '45vh',
        maxWidth: '20vw',
        minWidth: '150px',
        overflowY: 'scroll',
        display: 'flex',
        flexWrap: 'nowrap',
        
    },
    picker: {
        maxWidth: '45vw',
        gap: '5%',
        flexWrap: 'nowrap',
        alignItems: 'flex-end',
    },
    backBtn: {
        position: 'absolute',
        bottom: '3vh',
        left: '18vw',
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    iconBtn: {
        position: 'absolute',
        margin: '-30px'
    }
}))

function AstronautsPicker( {astronauts, assigned, onAssign, name, spacecraft, onSpacecraftChange}:any ) {
    const [ selected, setSelected ] = useState<User[]>(Array);

    const classes = useStyles();

    const handleDelete = () => {
        setSelected([]);
        onSpacecraftChange({});
    }

    const handleSelect = (astronaut:User) => {
        let exist = false;
        selected.forEach((e:User)=> {
            if (e.id === astronaut.id){
                exist = true;
                return alert('Astronaut already assigned');
            }
        })

        !exist && setSelected([...selected, astronaut]);
        
    };

    const handleRemoveSelect = (astronaut:User) => {
        const copyUsers = [...selected];
        const index = copyUsers.findIndex( (e:User) => e.id === astronaut.id);
        copyUsers.splice(index,1);
        setSelected(copyUsers);
    };

    return (
        <Grid container justify='space-evenly'>

        <MissionInfo name={name} target={spacecraft} assigned={selected} />

        <Grid container className={classes.picker} justify='center'>
            <Grid container direction='column' className={classes.astronautsContainer}>
                {
                    astronauts.map((e:any) => (
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
                            {
                                selected.length === spacecraft.seats ?
                                    <Button
                                        color={e.onMission ? 'secondary' : 'default'}
                                        onClick={()=> alert(`max number of astronauts (${spacecraft.seats}) reached`)}
                                    >
                                        {e.firstName} {e.lastName}
                                    </Button>
                                :
                                    <Button 
                                        color={e.onMission ? 'secondary' : 'default'}
                                        onClick={()=> handleSelect(e)}
                                    >
                                        {e.firstName} {e.lastName}
                                    </Button>
                            }

                        </HtmlTooltip>
                    ))
                }
            </Grid>
            
            <Grid container direction='column' className={classes.astronautsContainer}>
                {
                    selected.length === spacecraft.seats ?
                        <Typography color='primary' align='center' >
                            {selected.length}/{spacecraft.seats} astronauts assigned
                        </Typography> 
                    :
                        <Typography color='textSecondary' align='center' >
                            {selected.length}/{spacecraft.seats} astronauts assigned
                        </Typography>  
                }
                {
                    selected.map((e:any) => (
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
                            <Button 
                                color={e.onMission ? 'secondary' : 'default'}
                                onClick={()=> handleRemoveSelect(e)}
                            >
                                {e.firstName} {e.lastName}
                            </Button>
                        </HtmlTooltip>
                    ))
                }
                
            </Grid>
            {
                selected.length === spacecraft.seats ?
                    <Fab
                        variant="extended"
                        color='primary'
                        className={classes.iconBtn}
                        onClick={()=> onAssign(selected)}
                    >
                        <AddIcon className={classes.extendedIcon} />
                        Pick
                    </Fab>
                :
                    <Fab
                        disabled
                        variant="extended"
                        color='primary'
                        className={classes.iconBtn}
                    >
                        <AddIcon className={classes.extendedIcon} />
                        Pick
                    </Fab>
            }

        </Grid>

        <Button
            className={classes.backBtn}
            variant='outlined' 
            color='primary' 
            onClick={() => handleDelete()}
        >
            Back
        </Button>

    </Grid>
    )
}

export default AstronautsPicker;