import { useState } from "react";
import { 
    Grid,
    Paper,
    Typography,
    makeStyles,
    Fab,
    TextField,
    InputAdornment,
    Tooltip
} from "@material-ui/core";
import RefreshIcon from '@material-ui/icons/Refresh';
import SearchIcon from '@material-ui/icons/Search';

import { Mission } from "../../../types";
import FormControlGroup from "./formControlGroup";

const useStyles = makeStyles(() => ({
    root: {
        marginTop: '50px',
        padding: '10px',
    },
    missionsDashboard: {
        gap: '4px',
        width: '95vw',
        height: '175px',
        overflowX: 'scroll',
        flexDirection: 'column',
        textAlign: 'center',
    },
    missionContainer: {
        padding: '5px',
        margin: '5px'
    },
    fabButton: {
        boxShadow: '0px 0px 0px rgb(0 0 0 / 0%)',
        backgroundColor: 'transparent',
        '&:hover': {
            '& $fabIcon': {
                animation: '$rotation 1s cubic-bezier(0.13, 0.41, 0.54, 1.31)',
            },
        }
    },
    fabIcon: {
    
    },
    "@keyframes rotation": {
        '0%': {
          transform:'rotate(0deg)',
        },
        '100%': {
          transform:'rotate(360deg)',
        },
    },
    filterGroup: {
        width: '70vw'
    }
}))

export default function OperatorDashboard({missions, onMissionUpdate}:any) {
    const [ filter, setFilter ] = useState<'all' | 'failed' | 'success' | 'progress'>('all');
    const [ name, setName ] = useState<string>('');

    const classes = useStyles();

    function filterMissions():Mission[] {
        switch (filter) {
            case 'success':
                return missions.data.filter((e:Mission) => e.status === 'Mission successful');
            case 'failed':
                return missions.data.filter((e:Mission) => e.status === 'Mission failed');
            case 'progress':
                return missions.data.filter((e:Mission) => e.status.includes('Flying to'));
            default:
                return missions.data;
        }
    }

    function filterMissionName():Mission[] {
        return filterMissions().filter( (e:Mission) => e.name.toLowerCase().includes(name.toLowerCase()));
    }

    const handleAll = () => setFilter('all');

    const handleSuccess = () => setFilter('success');

    const handleFailed = () => setFilter('failed');

    const handleInProgress = () => setFilter('progress');

    const handleNameChange = (e:string) => setName(e);

    return(
        <Grid container justify='center' className={classes.root}>
            <Grid container direction='column' alignItems='center' alignContent='center' className={classes.filterGroup}>
                <Typography gutterBottom variant='h6' color='textSecondary'>Missions overview</Typography>

                <Grid container justify='space-between' alignItems='center'>
                    <TextField 
                        id='name'
                        type='text'
                        value={name}
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
                    <Tooltip title='Refresh' aria-label='refresh'>
                        <Fab 
                            className={classes.fabButton}
                            size='small' 
                            color='default' 
                            onClick={()=> onMissionUpdate()}
                        >
                            <RefreshIcon className={classes.fabIcon}/>
                        </Fab>
                    </Tooltip>
                </Grid>

                <FormControlGroup 
                    filter={filter}
                    onAll={handleAll}
                    onSuccess={handleSuccess}
                    onFailed={handleFailed}
                    onInProgress={handleInProgress}
                />
            </Grid>

            <Grid container justify='center' className={classes.missionsDashboard} id='missionsContainer'>
                {
                    filterMissionName().map((e:Mission) => 
                            <Paper elevation={4} key={e.id} className={classes.missionContainer}>
                                <Typography>Mission: {e.name}</Typography>
                                {
                                    e.status === 'Mission failed' ?
                                        <Typography color='error'>Status: {e.status}</Typography>
                                    :   
                                    e.status === 'Mission successful' ?
                                        <Typography style={{color: '#00b100'}}>Status: {e.status}</Typography>
                                    :
                                        <Typography>Status: {e.status}</Typography>
                                }
                                <Typography>Landing: {new Intl.DateTimeFormat('en-GB', {
                                                            year: "numeric",
                                                            month: "numeric",
                                                            day: "2-digit",
                                                            hour: "2-digit",
                                                            minute: "2-digit"
                                                        }).format(e.landing)
                                                    }
                                </Typography>
                                <Typography>Final destination: {e.destination}</Typography>
                            </Paper >
                    )
                }
            </Grid>
        </Grid>
    )
}