import { useState } from 'react';
import {
    makeStyles,
    TextField,
    Fab,
    Grid,
    CardMedia,
    Theme,
    Typography
} from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import * as EmailValidator from 'email-validator';

import { User } from '../../../types';

import AddIcon from '@material-ui/icons/Add';

import astronautsImg from '../../../images/two_astronauts.jpg';

const useStyles = makeStyles((theme: Theme) => ({
    form: {
      width: '100%',
    },
    button: {
      textAlign: 'center',
    },
    cardMedia: {
      width: 'auto',
      height: '281px',
      backgroundPositionY: '25%',
      marginTop: '-27px',
      margin: '-3%'
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));

const AddingForm = ({ onAdd, onAppend, users, error, clearError, onSuccess }:any) => {
  const [ passError, setPassError ] = useState<boolean>(false);
  const [ passValidation, setPassValidation ] = useState<boolean>(false);
  const [ ageError, setAgeError ] = useState<boolean>(false);
  const [ nameError, setNameError ] = useState<boolean>(false);
  const [ emailError, setEmailError ] = useState<boolean>(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birth, setBirth] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [consum, setConsum] = useState('');
  const [weight, setWeight] = useState('');

  const { t } = useTranslation();
  const classes = useStyles();
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
    setFirstName(e.target.value);
    clearAllErrors();
  }

  const handleLastNameChange = (e:any) => {
    e.preventDefault();
    setLastName(e.target.value);
  }

  const handleBirthChange = (e:any) => {
    e.preventDefault();
    setBirth(e.target.value);
    clearAllErrors();
  }

  const handleEmailChange = (e:any) => {
    e.preventDefault();
    setEmail(e.target.value);
    clearAllErrors();
    clearError();
  }

  const handleConsumChange = (e:any) => {
    e.preventDefault();
    setConsum(e.target.value);
    clearAllErrors();
  }

  const handleWeightChange = (e:any) => {
    e.preventDefault();
    setWeight(e.target.value);
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

      onAdd(firstName, lastName, email, password, repeatPassword, 'astronaut', age, birth, consum, weight);
      onAppend();
      
      setFirstName('');
      setLastName('');
      setBirth('');
      setEmail('');
      setPassword('');
      setRepeatPassword('');
      setConsum('');
      setWeight('');
      onSuccess();
    }

    const existingEmail = users.map( (e:User) => e.email);

    return (
        <form onSubmit={handleSubmit} className={classes.form}>
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
            <Grid item xs={12} sm={6}>
              <TextField
                type="number"
                variant="outlined"
                required
                fullWidth
                id="weight"
                name="weight"
                autoComplete="weight"
                value={weight}
                onChange={handleWeightChange}
                label="Weight (Kg)"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="number"
                variant="outlined"
                required
                fullWidth
                id="consum"
                name="consum"
                autoComplete="consum"
                value={consum}
                onChange={handleConsumChange}
                label="Consumption per hour (g)"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                variant="outlined"
                required
                fullWidth
                id="birth"
                name="birth"
                autoComplete="birth"
                label="Birth Date"
                value={birth}
                onChange={handleBirthChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {
                existingEmail.find((e:string) => e === email) ?
                <TextField
                onChange={handleEmailChange}
                value={email}
                variant="outlined"
                required
                fullWidth
                id="email"
                label='EMAIL ALREADY EXISTS'
                name="email"
                autoComplete="email"
                error
              />
                :
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
              }
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
            <Grid container justify='center' alignItems='center'>
              { passError && <Typography color='error' align='center' >{t('passError')}</Typography>}
              { error && <Typography color='error' align='center' >{t('emailExists')}</Typography>}
              { passValidation && 
                <Typography color='error' align='center' >{t('validation.password')}</Typography>
              }
              { ageError && <Typography color='error' align='center' >Operator must be 18 - 65 years old</Typography>}
              { nameError && <Typography color='error' align='center' >First and last name must have min 2 and max 40 characters</Typography>}
              { emailError && <Typography color='error' align='center' >Not a valid email address</Typography>}
            </Grid>
            <Grid className={classes.button} item xs={12}>
              {
                existingEmail.find((e:string) => e === email) ?
                <Fab 
                  className={classes.button} 
                  variant="extended" 
                  disabled 
                >
                  <AddIcon className={classes.extendedIcon} />
                  Add
                </Fab>
                :
                <Fab 
                  className={classes.button} 
                  variant="extended" 
                  type='submit'
                  color='primary'
                >
                  <AddIcon className={classes.extendedIcon} />
                  Add
                </Fab>
              }


              <CardMedia image={astronautsImg} title='' className={classes.cardMedia} />
            </Grid>
          </Grid>
        </form>
      );
}

export default AddingForm;