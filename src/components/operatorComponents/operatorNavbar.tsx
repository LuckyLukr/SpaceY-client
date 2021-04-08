import React from 'react';
import {
    makeStyles,
    Grid,
    ButtonGroup,
    Button,
    Typography
} from '@material-ui/core';

const useStyles = makeStyles(()=>({
    appbar: {
        height: '6vh',
    },
    buttonFlex: {
      flexWrap: 'wrap',
    }
}))

export default function OperatorNavbar() {
    const classes = useStyles();

    return(
        <div>
            <Grid container>
                <Grid container justify='space-between' className={classes.appbar}>
                    <Typography>
                        User
                    </Typography>
                    <ButtonGroup className={classes.buttonFlex} variant="text" aria-label="text primary button group">
                        <Button href='/dashboard' >
                            Dashboard
                        </Button>
                        <Button href='/astronauts'>
                            Astronauts
                        </Button>
                        <Button href='/spacecrafts' >
                            Spacecrafts
                        </Button>
                        <Button href='missions' >
                            Missions
                        </Button>
                        <Button href='/' >
                            Log out
                        </Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        </div>
    )
}