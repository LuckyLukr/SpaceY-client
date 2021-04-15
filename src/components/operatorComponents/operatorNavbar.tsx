import React from 'react';
import {
    makeStyles,
    Grid,
    ButtonGroup,
    Button,
    Typography,
    Divider
} from '@material-ui/core';

const useStyles = makeStyles(()=>({
    appbar: {
        height: '6vh',
    },
    buttonFlex: {
      flexWrap: 'wrap',
    }
}))

export default function OperatorNavbar( {onLogout}:any ) {
    const classes = useStyles();

    const user = JSON.parse(localStorage.user);

    return(
        <div>
            { user ?
            <Grid container>
                <Grid container justify='space-between' className={classes.appbar}>
                    <ButtonGroup className={classes.buttonFlex} variant="text" aria-label="navbar button group">
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
                    </ButtonGroup>

                    <Grid container alignItems='center' style={{width: 'fit-content'}} >
                        <Typography color='textSecondary'>
                            {user.email}
                        </Typography>
                        <Divider orientation='vertical' variant='middle' />
                        <ButtonGroup className={classes.buttonFlex} variant="text" aria-label="account button group">
                            <Button >
                                Account
                            </Button>
                            <Button href='/' onClick={() => onLogout()} >
                                Logout
                            </Button>
                        </ButtonGroup>
                    </Grid>
                    
                </Grid>
            </Grid>

            :

            null

            }
        </div>
    )
}