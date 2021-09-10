import React,{ useState } from 'react';
import {
    Grid,
    TextField,
    Link,
    Button,
    Typography
} from '@material-ui/core';
import sha1 from 'js-sha1';

import { useStyles } from './styles';
import { useTranslation } from 'react-i18next';



export default function LogIn( {onLogin, error, clearError}:any ) {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const classes = useStyles();
    const { t } = useTranslation();

    const handleEmailChange = (e:any) => {
        e.preventDefault();
        clearError()
        setEmail(e.target.value);
    }
  
    const handlePasswordChange = (e:any) => {
        e.preventDefault();
        clearError()
        setPassword(e.target.value);
    }
    
    const handleSubmit = (e:any) => {
        e.preventDefault();
        const hasshedPass = sha1(password);
        onLogin(email, hasshedPass);
    }

    return (
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
                        autoComplete="email"
                        autoFocus
                        error={error}
                    />
                    <TextField
                        onChange={handlePasswordChange}
                        size='small'
                        variant="outlined"
                        margin="normal"
                        label={t('password')}
                        type="password"
                        id="password"
                        error={error}
                    />

                    {error && <Typography align='center' color='error'>Wrong email or password</Typography>}

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
    );
}