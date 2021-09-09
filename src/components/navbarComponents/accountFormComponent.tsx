import { useState } from 'react';
import {
    makeStyles,
    TextField,
    Fab,
    Grid,
    Theme
} from '@material-ui/core/';
import { useTranslation } from 'react-i18next';
import jwt_decode from 'jwt-decode';

import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme: Theme) => ({
    form: {
      width: '100%',
    },
    button: {
      textAlign: 'center',
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
}));


const AccountForm = ({ onSucces, onUpdate, user }:any) => {
    const tokenData = jwt_decode(user.access_token);

  const [firstName, setFirstName] = useState(user.user.firstName);
  const [lastName, setLastName] = useState(user.user.lastName);
  const [birth, setBirth] = useState(user.user.birth);
  const [age, setAge] = useState(user.user.age);
  const [consum, setConsum] = useState(user.user.consum);
  const [weight, setWeight] = useState(user.user.weight);
  
  const { t } = useTranslation();
  const classes = useStyles();

  const handleFirstNameChange = (e:any) => {
    e.preventDefault();
    setFirstName(e.target.value);
  }

  const handleLastNameChange = (e:any) => {
    e.preventDefault();
    setLastName(e.target.value);
  }

  const handleBirthChange = (e:any) => {
    e.preventDefault();
    setBirth(e.target.value);
  }

  const handleConsumChange = (e:any) => {
    e.preventDefault();
    setConsum(parseInt(e.target.value));
  }

  const handleWeightChange = (e:any) => {
    e.preventDefault();
    setWeight(parseInt(e.target.value));
  }

  const getAge = (dateString:string) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    setAge(age);
}

  const handleSubmit = async (e:any) => {
      e.preventDefault();
      getAge(birth);

      const updatedUser = {
        firstName,
        lastName,
        age,
        birth,
        consum,
        weight
      };

      const updateStorage = {
        access_token: user.access_token,
        user: {
        _id: user.user._id,
        age: updatedUser.age,
        birth: updatedUser.birth,
        consum: updatedUser.consum,
        email: user.user.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        onMission: user.user.onMission,
        password: user.user.password,
        role: user.user.role,
        weight: updatedUser.weight
        }
      }

      localStorage.setItem('user', JSON.stringify(updateStorage));
      onUpdate(user.user._id, updatedUser);
      onSucces();
    }

    return (
        <form onSubmit={handleSubmit} className={classes.form}>
          <Grid container spacing={2} justify='center'>
            <Grid item >
            <TextField
                onChange={handleFirstNameChange}
                value={firstName}
                autoComplete="fname"
                name="firstName"
                id="firstName"
                label={t('fName')}
              />
            </Grid>
            <Grid item >
              <TextField
                onChange={handleLastNameChange}
                value={lastName}
                id="lastName"
                label={t('lName')}
                name="lastName"
              />
            </Grid>
            {
              tokenData.role === 'astronaut' &&
              <>
              <Grid item >
                <TextField
                  type="number"
                  id="weight"
                  name="weight"
                  value={weight}
                  onChange={handleWeightChange}
                  label="Weight (Kg)"
                />
              </Grid>
              <Grid item >
                <TextField
                  type="number"
                  id="consum"
                  name="consum"
                  value={consum}
                  onChange={handleConsumChange}
                  label="Consumption per hour (g)"
                />
              </Grid>
              </>
            }
            <Grid item>
              <TextField
                type="text"
                id="age"
                name="age"
                label="Age"
                value={age}
                InputProps={{
                    readOnly: true,
                }}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <TextField
                type="date"
                id="birth"
                name="birth"
                autoComplete="birth"
                label="Birthday"
                value={birth}
                onChange={handleBirthChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid className={classes.button} item xs={12}>
              <Fab 
                className={classes.button} 
                variant="extended" 
                type='submit' 
              >
                <SaveIcon className={classes.extendedIcon} />
                Save
              </Fab>
            </Grid>
          </Grid>
        </form>
      );
}

export default AccountForm;