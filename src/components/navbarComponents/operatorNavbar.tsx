import React from 'react';
import {
    makeStyles,
    Grid,
    ButtonGroup,
    Button,
    Typography,
    Divider
} from '@material-ui/core';
import jwt_decode from 'jwt-decode';

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

    const user = JSON.parse(localStorage.user)
    const token = JSON.parse(localStorage.token);
    const tokenData = jwt_decode(token);

    return(
        <div>
            { user.access_token === token ?
            <Grid container>
                <Grid container justify={tokenData.role === 'operator' ? 'space-between' : 'flex-end'} className={classes.appbar}>

                    { tokenData.role === 'operator' ?

                    <ButtonGroup className={classes.buttonFlex} variant="text" aria-label="navbar button group">
                        <Button href='/' >
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

                    :
                        null
                    }

                    <Grid container justify='flex-end' alignItems='center' style={{width: 'fit-content'}} >
                        <Typography color='textSecondary'>
                            {user.user.email}
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