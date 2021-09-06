import { 
    Grid, 
    Typography,
    makeStyles
} from "@material-ui/core";
import { useState } from "react";

import { Mission } from "../../../types";

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
        border: 'solid 1px black', 
        padding: '5px',
    }
}))

export default function OperatorDashboard({missions}:any) {
    const [ filter, setFilter ] = useState<'all' | 'failed' | 'success' | 'progress'>('all');

    const classes = useStyles();

    return(
        <Grid container justify='center' className={classes.root}>
            <Typography variant='h6' color='textSecondary' style={{marginTop: '50px'}}>Missions overview</Typography>
        
            <Grid container justify='center' className={classes.missionsDashboard}>
                {
                    missions.data.map((e:Mission) => 
                            <Grid key={e.id} className={classes.missionContainer}>
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
                            </Grid>
                    )
                }
            </Grid>
        </Grid>
    )
}