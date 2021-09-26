import { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useTranslation } from 'react-i18next';
import * as EmailValidator from 'email-validator';

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
  },
  logoText: {
    color: '#666666',
    fontFamily: "'Zen Dots', cursive",
  }
}));

export default function SignUp( {onAdd, error, clearError, onSucces}:any ) {
  const [ passError, setPassError ] = useState<boolean>(false);
  const [ passValidation, setPassValidation ] = useState<boolean>(false);
  const [ ageError, setAgeError ] = useState<boolean>(false);
  const [ nameError, setNameError ] = useState<boolean>(false);
  const [ emailError, setEmailError ] = useState<boolean>(false);
  const [ firstName, setFirstName ] = useState<string>('');
  const [ lastName, setLastName ] = useState<string>('');
  const [ birth, setBirth ] = useState<string>('');
  const [ email, setEmail ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const [ repeatPassword, setRepeatPassword ] = useState<string>('');

  const classes = useStyles();
  const { t } = useTranslation();
  const validPassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);

  const clearAllErrors = () => {
    setPassError(false);
    setPassValidation(false);
    setAgeError(false);
    setNameError(false);
    setEmailError(false);
  }

  const handleFirstNameChange = (e:any) => {
    e.preventDefault();
    setFirstName(e.target.value.trim());
    clearAllErrors();
  }

  const handleLastNameChange = (e:any) => {
    e.preventDefault();
    setLastName(e.target.value.trim());
    clearAllErrors();
  }

  const handleBirthChange = (e:any) => {
    e.preventDefault();
    setBirth(e.target.value);
    clearAllErrors(); 
  }

  const handleEmailChange = (e:any) => {
    e.preventDefault();
    setEmail(e.target.value);
    clearError();
    clearAllErrors();
  }

  const handlePasswordChange = (e:any) => {
    e.preventDefault();
    setPassword(e.target.value);
    clearAllErrors();
  }

  const handleRepeatPasswordChange = (e:any) => {
    e.preventDefault();
    setRepeatPassword(e.target.value);
    clearAllErrors();
  }

  const getAge = (dateString:string) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }

  const handleSubmit = (e:any) => {
      e.preventDefault();
      const age = getAge(birth);

      if(firstName.length < 2 || firstName.length > 40 || lastName.length < 2 || lastName.length > 40) {
        return setNameError(true);
      }
      if(!EmailValidator.validate(email)){
        return setEmailError(true);
      }
      if(age < 18 || age > 65) {
        return setAgeError(true);
      }
      if(password !== repeatPassword){
        return setPassError(true);
      }
      if(!validPassword.test(password)) {
        return setPassValidation(true);
      }

      onAdd(firstName, lastName, email, password, repeatPassword, 'operator', age, birth, 40, 75);
      setPassword('');
      setRepeatPassword('');
      onSucces();
    }

  return (
    <Container maxWidth={false} className={classes.root}>
      <CssBaseline />
      <div className={classes.paper}>
        <img style={{width: '80px'}} src={logo} alt='logo' />
        <Typography className={classes.logoText} component="h1" variant="h5">
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
                error={nameError}
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
                error={nameError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
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
                error={error || emailError}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                onChange={handleBirthChange}
                value={birth}
                variant="outlined"
                required
                fullWidth
                id="birth"
                label={t('birth')}
                name="birth"
                autoComplete="birth"
                InputLabelProps={{
                  shrink: true,
                }}
                error={ageError}
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
                error={passError || passValidation}
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
                error={passError || passValidation}
              />
            </Grid>
          </Grid>
          { passError && <Typography color='error' align='center' >{t('passError')}</Typography>}
          { error && <Typography color='error' align='center' >{t('emailExists')}</Typography>}
          { passValidation && 
            <Typography color='error' align='center' >{t('validation.password')}</Typography>
          }
          { ageError && <Typography color='error' align='center' >Operator must be 18 - 65 years old</Typography>}
          { nameError && <Typography color='error' align='center' >First and last name must have min 2 and max 40 characters</Typography>}
          { emailError && <Typography color='error' align='center' >Not a valid email address</Typography>}
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