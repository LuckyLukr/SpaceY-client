import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {
    Grid,
    Link,
    TextField,
    Button,
    Typography
} from '@material-ui/core';
import sha1 from 'js-sha1';

import { useStyles } from './styles';
import logo from '../../images/Y_white.png';
import { useTranslation } from 'react-i18next';
import { login } from '../../featrues/userSlice';


export default function LogIn( {initialState, isLoged}:any ) {
    const [ formData, setFormData ] = useState(initialState);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const API = 'http://localhost:5000/users/';
    const classes = useStyles();
    const { t } = useTranslation();

    const dispatch = useDispatch();
    const hashedPass = sha1(password);


    const getUser = () => {        
        const login = { email: email, password: hashedPass };
        return new Promise( resolve => {
        axios.post(`${API}login`,login)
            .then( res => {
            resolve(res.data);
            })
            .catch( err => alert('Wrong email or password.' + err) );
        })
    };
    
    async function logUser() {
        const result = await getUser() as any;
        setFormData(result);
        if(result){
            window.open(`dashboard`);
        }
        dispatch(login({
            email: result.email,
            password: result.password,
            loggedIn: true
        }))
        console.log(result);
        console.log(formData);
    }

    function handleEmailChange(e:any) {
        e.preventDefault();
        setEmail(e.target.value);
    }

    function handlePasswordChange(e:any) {
        e.preventDefault();
        setPassword(e.target.value);
    }
    
    const handleSubmit = (e:any) => {
        e.preventDefault();
        
        logUser()
    }

    return (
        <div className={classes.root}>
            <Grid container justify='center' alignItems='center' >
                <Typography variant='h1' className={classes.headerTypo}>SPACE</Typography>
                <img className={classes.yImg} src={logo} alt='Ylogo' />
            </Grid>
            <Typography variant='caption' className={classes.subTypo} >{t('subtitle')}</Typography>

            <div className={classes.paper}>
                <form className={classes.form} onSubmit={handleSubmit} >
                    <TextField
                        value={email}
                        onChange={handleEmailChange}
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
                        value={password}
                        onChange={handlePasswordChange}
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