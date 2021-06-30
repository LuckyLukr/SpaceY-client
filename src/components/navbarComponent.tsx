import React from 'react';
import {Grid,  
        Typography,
        makeStyles,
        Button,
        ButtonGroup,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import logo from '../images/Y_white.png';

const useStyles = makeStyles({
  headerText: {
    letterSpacing: '1.5vw',
    textIndent: '0.8vw',
    color: 'white',
    zIndex: 1,
    fontFamily: "'Zen Dots', cursive",
  },
  buttonFlex: {
    flexWrap: 'wrap',
    color: 'white',
    zIndex: 1,
  },
  button: {
    color: 'white',
  },
  root: {
    width: '100%',
    padding: 10,
    backgroundColor: '#2e2e2e',
  },
  yImg: {
      width: '40px'
  }
})

function Navbar() {
    const classes = useStyles();
    const { i18n } = useTranslation();
    const changeLanguage = (language:string) => i18n.changeLanguage(language);

    return(
        <Grid className={classes.root} container justify='space-between'>
            <Grid item style={{display: 'flex', alignItems: 'center'}} >
                <Typography variant='h6' className={classes.headerText}>SPACE</Typography>
                <img className={classes.yImg} src={logo} alt='Y' />
            </Grid>
            <ButtonGroup className={classes.buttonFlex} variant="text" size='large' aria-label="text primary button group">
              <Button className={classes.button} onClick={()=> changeLanguage("cz")} >
                CZ
              </Button>
              <Button className={classes.button} onClick={()=> changeLanguage("en")} >
                EN
              </Button>
            </ButtonGroup>
        </Grid>
    )
}

export default Navbar;