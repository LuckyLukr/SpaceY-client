import { Grid,
         Card,
         CardMedia,
         ButtonGroup,
         Button,
         Typography
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useStyles } from './styles';

import LogIn from './loginFormComponent';
import SpaceOrbitImg from '../../images/SpaceOrbit.jpeg';
import logo from '../../images/Y_white.png';

function LoginPage( { user, error, onLogin, clearError }:any ) {

    const classes = useStyles();
    const { i18n, t } = useTranslation();
    const changeLanguage = (language:string) => i18n.changeLanguage(language);

    return(
            <Card square >
                <CardMedia className={classes.headerImg} image={SpaceOrbitImg}>
                    <ButtonGroup className={classes.buttonFlex} variant="text" aria-label="text primary button group">
                        <Button className={classes.button} onClick={()=> changeLanguage("cz")} >
                            CZ
                        </Button>
                        <Button className={classes.button} onClick={()=> changeLanguage("en")} >
                            EN
                        </Button>
                    </ButtonGroup>
                    <Grid className={classes.headerFilter} container direction='column' justify='center' alignItems='center' >
                        
                    <div className={classes.root}>
                        <Grid container justify='center' alignItems='center' >
                            <Typography variant='h1' className={classes.headerTypo}>SPACE</Typography>
                            <img className={classes.yImg} src={logo} alt='Ylogo' />
                        </Grid>
                        <Typography variant='caption' className={classes.subTypo} >{t('subtitle')}</Typography>

                        <div className={classes.paper}>
                            <LogIn 
                                user={user} 
                                error={error} 
                                clearError={clearError}
                                onLogin={onLogin}
                            />
                        </div>
                    </div>

                    </Grid>
                </CardMedia>
            </Card>
    )
}

export default LoginPage;