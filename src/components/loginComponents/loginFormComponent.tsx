import React,{ useState } from 'react';
import {
    Grid,
    TextField,
    Link,
    Button,
    Typography
} from '@material-ui/core';

import { useStyles } from './styles';
import logo from '../../images/Y_white.png';
import { useTranslation } from 'react-i18next';



export default function LogIn( {onLogin}:any ) {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const classes = useStyles();
    const { t } = useTranslation();

    const handleEmailChange = (e:any) => {
        e.preventDefault();
        setEmail(e.target.value);
        console.log(e.target.value);
    }
  
    const handlePasswordChange = (e:any) => {
        e.preventDefault();
        setPassword(e.target.value);
    }
    
    const handleSubmit = (e:any) => {
        e.preventDefault();
        
        onLogin(email, password);
    }

    return (
        <div className={classes.root}>
            <Grid container justify='center' alignItems='center' >
                <Typography variant='h1' className={classes.headerTypo}>SPACE</Typography>
                <img className={classes.yImg} src={logo} alt='Y' />
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