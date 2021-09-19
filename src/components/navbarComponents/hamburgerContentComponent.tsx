import { useState } from "react";
import { 
    Button,
    ButtonGroup,
    Grid, 
    Typography,
    makeStyles,
    CardMedia
} from "@material-ui/core";
import { useTranslation } from 'react-i18next';
import CloseIcon from '@material-ui/icons/Close';
import logo from '../../images/Y_white.png';
import Account from "./accountComponent";

import earthImg from '../../images/earth-half-inspace.jpg';

const useStyles = makeStyles(() => ({
    root: {
        position: 'fixed',
        zIndex: 100,
        background: 'linear-gradient(0deg, rgba(0,0,0) 35%, rgba(46,46,46) 100%)',
        left: 0,
        top: 0,
        width: '100%',
        color: 'white'
    },
    headerText: {
        letterSpacing: '1.5vw',
        textIndent: '0.8vw',
        color: 'white',
        zIndex: 1,
        fontFamily: "'Zen Dots', cursive",
    },
    yImg: {
        width: '50px'
    },
    header: {
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '-43px',
        marginBottom: '20px'
    },
    button: {
        color: 'white',
    },
    closeButton: {
        color: 'white',
        marginRight: '25px',
        marginTop: '25px',
        alignSelf: 'flex-end'
    },
    menuButton: {
        color: 'white',
        width: '80vw',
        height: '65px'
    },
    accountButton: {
        color: 'white',
        width: '80vw',
        height: '50px'
    },
    cardMedia: {
        width: '100%',
        height: '300px',
        marginTop: '-150px'
    }
}))

export default function HamburgerContent( {onAppend, onLogout, onUpdate, onSucces, user}:any ) {
    const [ onAccount, setOnAccount ] = useState<boolean>(false);

    const classes = useStyles();
    const { i18n } = useTranslation();
    const changeLanguage = (language:string) => i18n.changeLanguage(language);

    const handleClickAway = () => setOnAccount(false);
    const handleAppendAccount = () => setOnAccount(!onAccount);

    return(
        <Grid container direction='column' className={classes.root}>
            {
                onAccount && <Account 
                                onClose={handleClickAway} 
                                onUpdate={onUpdate}
                                onSucces={onSucces}
                                user={user}
                             />
            }
            <Button className={classes.closeButton} onClick={() => onAppend()}>
                <CloseIcon fontSize='large' />
            </Button>
            <Grid item className={classes.header} >
                <Typography variant='h4' className={classes.headerText}>SPACE</Typography>
                <img className={classes.yImg} src={logo} alt='Y' />
            </Grid>
            <Grid container direction='column' justify='center' alignItems='center'>

                <ButtonGroup variant="text" size='large' orientation='vertical'>
                    <Button className={classes.menuButton} href='/' >Dashboard</Button>
                    <Button className={classes.menuButton} href='/astronauts' >Astronauts</Button>
                    <Button className={classes.menuButton} href='/spacecrafts' >Spacecrafts</Button>
                    <Button className={classes.menuButton} href='/makeMission' >Missions</Button>
                </ButtonGroup>

                <ButtonGroup style={{margin: '50px 0px'}} orientation='vertical' variant='text' aria-label="account button group">
                    <Button className={classes.accountButton} onClick={() => handleAppendAccount()} >
                        Account
                    </Button>
                    <Button className={classes.accountButton} onClick={() => onLogout()} >
                        Logout
                    </Button>
                </ButtonGroup>
                <ButtonGroup variant="text" size='large' aria-label="text primary button group">
                    <Button className={classes.button} onClick={()=> changeLanguage("cz")} >
                    CZ
                    </Button>
                    <Button className={classes.button} onClick={()=> changeLanguage("en")} >
                    EN
                    </Button>
                </ButtonGroup>
            </Grid>
            <CardMedia image={earthImg} title='' className={classes.cardMedia} />
        </Grid>
    )
}