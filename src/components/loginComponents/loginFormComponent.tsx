import React from 'react';
import {
    Grid,
    Link,
    TextField,
    Button,
    makeStyles,
    Typography
} from '@material-ui/core';

import logo from '../../images/Y_white.png';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px 0px',
    padding: '10px 0px',
    width: '100%',
    backgroundColor: '#ffffffbf'
  },
  form: {
    width: '35%',
    [theme.breakpoints.down('sm')]: {
        width: '50%',
    },
    [theme.breakpoints.down('xs')]: {
        width: '90%',
    },
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    color: "#07283f"
  },
  headerTypo: {
      letterSpacing: '3vw',
      textIndent: '1.5vw',
      color: 'white',
      fontSize: '90px',
      [theme.breakpoints.down('sm')]: {
          fontSize: '60px',
      },
      [theme.breakpoints.down('xs')]: {
          fontSize: '35px',
      },
  },
  subTypo: {
      color: 'white',
      letterSpacing: '2vw',
      textAlign: 'center',
  },
  yImg: {
      width: '140px'
  }
}));

export default function LogIn() {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
        <Grid container justify='center' alignItems='center' >
            <Typography variant='h1' className={classes.headerTypo}>SPACE</Typography>
            <img className={classes.yImg} src={logo} alt='Y' />
        </Grid>
        <Typography variant='caption' className={classes.subTypo} >{t('subtitle')}</Typography>

        <div className={classes.paper}>
            <form className={classes.form} noValidate>
                <TextField
                    size='small'
                    variant="outlined"
                    margin="normal"
                    required
                    id="email"
                    label={t('emailAdress')}
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    size='small'
                    variant="outlined"
                    margin="normal"
                    required
                    name="password"
                    label={t('password')}
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    href='/dashboard'
                >
                    {t('logInBtn')}
                </Button>
                <Grid container>
                    <Grid item xs>
                    <Link href="#" variant="body2">
                    {t('forgotPass')}
                    </Link>
                    </Grid>
                    <Grid item>
                    <Link href="/signup" variant="body2">
                        {t('signUpLink')}
                    </Link>
                    </Grid>
                </Grid>
            </form>
        </div>
    </div>
  );
}