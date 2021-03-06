import jwt_decode from 'jwt-decode';
import { 
    Card,
    CardMedia,
    Grid,
    makeStyles,
    Typography,
    Button,
    Tooltip,
    ClickAwayListener,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import logo from '../../images/Y_black.png';
import astronautsImg from '../../images/two_astronauts_earth.jpg';

import AccountForm from './accountFormComponent';

const useStyles = makeStyles((theme)=>({
    root: {
        width: '80vw',
        minHeight: '75vh',
        margin: '5% 0%',
        padding: '10px',
        transition: '1s',
        textAlign: 'center',
        zIndex: 1,
    },
    addFormCard: {
        [theme.breakpoints.down('xs')]: {
            maxHeight: '91vh',
        },
        maxWidth: 600,
        maxHeight: '87vh',
        marginTop: '62px',
    },
    addFormRoot: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 200,
        backgroundColor: '#00000070',
    },
    addBtn: {
        margin: '10px 0px',
    },
    closeBtn: {
        borderRadius: '50%',
        minWidth: '40px',
        height: '40px',
    },
    typo: {
        color: '#666666',
    },
    typoPad: {
        color: '#666666',
        fontFamily: "'Zen Dots', cursive",
    },
    cardMedia: {
        width: 'auto',
        height: '250px',
        backgroundPositionY: '25%',
        marginTop: '-33px'
      },
}))

function Account( {onClose, onUpdate, onSucces, user}:any ) {
    const tokenData = jwt_decode(user.access_token);

    const classes = useStyles();

    return(
        <Grid className={classes.addFormRoot} container justify='center'>   
            <ClickAwayListener onClickAway={onClose}>        
                <Card elevation={0} className={classes.addFormCard}>

                    <Grid container justify='flex-end'>
                        <Tooltip title='Close' >
                            <Button className={classes.closeBtn} onClick={()=> onClose()} color='inherit' >
                                <CloseIcon />
                            </Button>
                        </Tooltip>
                    </Grid>
                    
                    <Grid container justify='center' alignItems='center' direction='column' >
                        <img style={{width: '80px'}} src={logo} alt='logo' />
                        <Typography className={classes.typoPad} variant="h5" gutterBottom >
                            {tokenData.role.toUpperCase()}
                        </Typography>
                        <Typography className={classes.typo} >
                            {user.user.firstName} {user.user.lastName}
                        </Typography>
                        <Typography className={classes.typo} gutterBottom >
                            {user.user.email}
                        </Typography>
                    </Grid>

                    <AccountForm 
                        onClose={onClose} 
                        onUpdate={onUpdate}
                        onSucces={onSucces}
                        user={user}
                    />

                    <CardMedia image={astronautsImg} title='operator' className={classes.cardMedia} />
                    
                </Card>
            </ClickAwayListener>  
        </Grid>  
    )
}

export default Account;