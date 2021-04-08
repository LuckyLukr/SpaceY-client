import React from 'react';
import { Grid,
         makeStyles,
         Card,
         CardMedia,
         ButtonGroup,
         Button    
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import SignUp from './signupFormComponent';

import SpaceOrbitImg from '../../images/SpaceOrbit.jpeg';

const useStyles = makeStyles((theme)=>({
    headerImg: {
        width: '100vw',
        height: '100vh',
    },
    headerFilter: {
        width: '100%',
        height: '100%',
        backgroundColor: '#0000001a',
    },
    buttonFlex: {
      flexWrap: 'wrap',
      color: 'white',
      zIndex: 2,
      position: 'absolute',
      top: 0,
      right: 0
    },
    button: {
      color: 'white',
    },
}))

function SignupPage() {
    const classes = useStyles();
    const { i18n } = useTranslation();
    const changeLanguage = (language:string) => i18n.changeLanguage(language);

    return(
            <Card square >
                <CardMedia className={classes.headerImg} image={SpaceOrbitImg}>
                    <ButtonGroup className={classes.buttonFlex} variant="text" aria-label="text primary button group">
                        <Button className={classes.button} onClick={()=> changeLanguage("cz")} >
                            CZ
                        </Button>
                        <Button className={classes.button} onClick={()=> changeLanguage("en")} >
                            EN
                        </Button>
                    </ButtonGroup>
                    <Grid className={classes.headerFilter} container direction='column' justify='center' alignItems='center' >
                        
                        <SignUp />

                    </Grid>
                </CardMedia>
            </Card>
    )
}

export default SignupPage;