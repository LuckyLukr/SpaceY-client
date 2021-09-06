import { 
    Grid,
    Paper,
    Typography,
    makeStyles,
} from "@material-ui/core";
import { useState } from "react";

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
    },
    missionContainer: {
        padding: '5px',
    }
}))

export default function OperatorDashboard({missions}:any) {
    const [ filter, setFilter ] = useState<'all' | 'failed' | 'success' | 'progress'>('all');

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

    function handleAll() {
        setFilter('all');
    }

    function handleSuccess() {
        setFilter('success');
    }

    function handleFailed() {
        setFilter('failed');
    }

    function handleInProgress() {
        setFilter('progress');
    }

    return(
        <Grid container justify='center' className={classes.root}>
            <Grid container direction='column' alignItems='center' alignContent='center'>
                <Typography gutterBottom variant='h6' color='textSecondary'>Missions overview</Typography>

                <FormControlGroup 
                    filter={filter}
                    onAll={handleAll}
                    onSuccess={handleSuccess}
                    onFailed={handleFailed}
                    onInProgress={handleInProgress}
                />
            </Grid>

            <Grid container justify='center' className={classes.missionsDashboard}>
                {
                    filterMissions().map((e:Mission) => 
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