import { useState } from 'react';
import {
    makeStyles,
    TextField,
    Button,
    Grid,
    CardMedia,
    Fab,
    Theme
} from '@material-ui/core/';

import AddIcon from '@material-ui/icons/Add';

import { Spacecraft } from '../../../types';
import {  SCsArray } from './factory';
import astronautsImg from '../../../images/two_astronauts.jpg';

const useStyles = makeStyles((theme: Theme) => ({
    form: {
      width: '100%',
    },
    button: {
      margin: '-10px 0px 10px 0px',
    },
    cardMedia: {
      width: 'auto',
      height: '281px',
      backgroundPositionY: '25%',
      marginTop: '-33px'
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));


function AddingForm( {onAdd, onAppend }:any ) {
    const [ name, setName ] = useState<string>('');
    const [ model, setModel ] = useState<string>('');
    const [ img, setImg ] = useState<string>(astronautsImg);
    const [ weight, setWeight ] = useState<number>(0);
    const [ seats, setSeats ] = useState<number>(0);
    const [ tankCapacity, setTankCapacity ] = useState<number>(0);
    const [ motorImpulse, setMotorImpulse ] = useState<number>(0);
    const [ fridge, setFridge ] = useState<number>(0);
    const [ fuelConsumption, setFuelConsumption ] = useState<number>(0);

    const classes = useStyles();

    const handleModelChange = (e:Spacecraft) => {
      setModel(e.type);
      setWeight(e.weight);
      setSeats(e.seats);
      setTankCapacity(e.tankCapacity);
      setMotorImpulse(e.motorImpulse);
      setFuelConsumption(e.fuelConsumption);
      setFridge(e.fridge);
      setImg(e.img);
    };

    const handleNameChange = (e:any) => {
        e.preventDefault();

        setName(e.target.value);
    }

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        onAdd(name, model, weight, seats, tankCapacity, motorImpulse, fuelConsumption, fridge);
        onAppend();
        
        setName('');
    }
    return (
        <form onSubmit={handleSubmit} className={classes.form}>

          <Grid container spacing={2}>
            <Grid container justify='space-evenly' alignItems='center' style={{margin: '20px 0px'}}>
              {
                SCsArray.map((e:Spacecraft) =>
                  <Button variant='contained' color='primary' key={e.type} onClick={()=> handleModelChange(e)}>
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
            <Grid item xs={12}>
              <Fab 
                className={classes.button} 
                variant="extended" 
                type='submit' 
              >
                <AddIcon className={classes.extendedIcon} />
                Add
              </Fab>

              <CardMedia image={img} title={model} className={classes.cardMedia} />
            </Grid>
          </Grid>
        </form>
      );
}

export default AddingForm;