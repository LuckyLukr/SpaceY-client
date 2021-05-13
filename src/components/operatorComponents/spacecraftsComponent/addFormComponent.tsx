import { useState } from 'react';
import {
    makeStyles,
    TextField,
    Button,
    Grid,
} from '@material-ui/core/';

import { Spacecraft } from '../../../types';
import {  SCsArray } from './factory';

const useStyles = makeStyles(() => ({
    form: {
      width: '100%',
    },
    button: {
      textAlign: 'center',
    },
  }));


function AddingForm( {onAdd, onAppend }:any ) {
    const [ name, setName ] = useState('');
    const [ model, setModel ] = useState('');
    const [ weight, setWeight ] = useState(0);
    const [ seats, setSeats ] = useState(0);
    const [ tankCapacity, setTankCapacity ] = useState(0);
    const [ motorImpulse, setMotorImpulse ] = useState(0);
    const [ fridge, setFridge ] = useState(0);

    const classes = useStyles();

    const handleModelChange = (e:Spacecraft) => {
      setModel(e.type);
      setWeight(e.weight);
      setSeats(e.seats);
      setTankCapacity(e.tankCapacity);
      setMotorImpulse(e.motorImpulse);
      setFridge(e.fridge);
    };

    const handleNameChange = (e:any) => {
        e.preventDefault();

        setName(e.target.value);
    }

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        onAdd(name, model, weight, seats, tankCapacity, motorImpulse, fridge);
        onAppend();
        
        setName('');
    }
    return (
        <form onSubmit={handleSubmit} className={classes.form}>
          <Grid container spacing={2}>
            <Grid container justify='space-evenly' alignItems='center' style={{margin: '20px 0px'}}>
              {
                SCsArray.map((e:Spacecraft) => 
                  <Button variant='outlined' color='primary' key={e.type} onClick={()=> handleModelChange(e)}>
                    {e.type}
                  </Button>
                )
              }
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="type"
                label="Model"
                value={model}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField
                onChange={handleNameChange}
                value={name}
                name="name"
                variant="outlined"
                required
                id="name"
                label="Spacecraft's Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="weight"
                label="Weight"
                value={`${weight} t`}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="seats"
                label="Seats"
                value={seats}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="tankCapacity"
                label="Fuel Tank Capacity"
                value={`${tankCapacity} l`}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="motorImpulse"
                label="Motor Impulse"
                value={motorImpulse}
                InputProps={{
                  readOnly: true,
                }}
                variant="outlined"
              />
            </Grid>
            <Grid className={classes.button} item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </form>
      );
}

export default AddingForm;