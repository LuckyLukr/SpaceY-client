import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';

import logo from '../../images/Y_black.png';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '444px',
    padding: '2%'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    backgroundColor: '#ffffffbf',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}));

export default function SignUp( {onAdd}:any ) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const classes = useStyles();
  const { t } = useTranslation();

  function handleFirstNameChange(e:any) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e:any) {
    setLastName(e.target.value);
  }

  function handleEmailChange(e:any) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e:any) {
    setPassword(e.target.value);
  }

  function handleRepeatPasswordChange(e:any) {
    setRepeatPassword(e.target.value);
  }

  function handleSubmit(e:any) {
      e.preventDefault();
      onAdd(firstName, lastName, email, password, repeatPassword, 'operator');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setRepeatPassword('');
    }

  return (
    <Container maxWidth={false} className={classes.root}>
      <CssBaseline />
      <div className={classes.paper}>
            <img style={{width: '80px'}} src={logo} alt='logo' />
        <Typography style={{color: '#666666'}} component="h1" variant="h5">
          OPERATOR
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={handleFirstNameChange}
                value={firstName}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label={t('fName')}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={handleLastNameChange}
                value={lastName}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label={t('lName')}
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleEmailChange}
                value={email}
                variant="outlined"
                required
                fullWidth
                id="email"
                label={t('emailAdress')}
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handlePasswordChange}
                value={password}
                variant="outlined"
                required
                fullWidth
                name="password"
                label={t('password')}
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleRepeatPasswordChange}
                value={repeatPassword}
                variant="outlined"
                required
                fullWidth
                name="repeatPassword"
                label={t('repeatPass')}
                type="password"
                id="repeatPassword"
                autoComplete="repeat-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {t('signUpLink')}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                {t('haveAccount')}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}