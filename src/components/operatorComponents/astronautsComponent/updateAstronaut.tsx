import { useState } from 'react';
import {
    makeStyles,
    TextField,
    Button,
    Grid,
} from '@material-ui/core/';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(() => ({
    form: {
      width: '100%',
    },
    button: {
      textAlign: 'center',
    },
}));


const UpdateAstronaut = ({ astronaut, onUpdate, onSucces }:any) => {
  const [firstName, setFirstName] = useState(astronaut.firstName);
  const [lastName, setLastName] = useState(astronaut.lastName);
  const [birth, setBirth] = useState(astronaut.birth);
  const [age, setAge] = useState(astronaut.age);
  const [consum, setConsum] = useState(astronaut.consum);
  const [weight, setWeight] = useState(astronaut.weight);
  
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
    return age;
}

  const handleSubmit = async (e:any) => {
      e.preventDefault();
      const updatedAge = getAge(birth);

      const updatedUser = {
        firstName,
        lastName,
        age: updatedAge,
        birth,
        consum,
        weight
      };
      onUpdate(astronaut.id, updatedUser);
      onSucces(); 
    }

    return (
        <form onSubmit={handleSubmit} className={classes.form}>
          <Grid container  spacing={2}>
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
            <Grid item xs={12} sm={6}>
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
            <Grid item xs={12} sm={6}>
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
              <Button
                type="submit"
                variant="outlined"
                color="primary"
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      );
}

export default UpdateAstronaut;