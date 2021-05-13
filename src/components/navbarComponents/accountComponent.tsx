import jwt_decode from 'jwt-decode';
import { 
    Card,
    Grid,
    makeStyles,
    Typography,
    Button,
    Tooltip,
    ClickAwayListener,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import logo from '../../images/Y_black.png';

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
            height: 650,
        },
        maxWidth: 600,
        maxHeight: '80vh',
        padding: '2%',
        marginTop: '100px',
    },
    addFormRoot: {
        width: '100%',
        height: '120%',
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
        marginTop: '-20px',
        marginRight: '-20px',
        [theme.breakpoints.down('xs')]: {
            marginTop: '-10px',
            marginRight: '-10px',
        },
    },
    typoPad: {
        color: '#666666'
    }
}))

function Account( {onClose, onUpdate, onSucces}:any ) {
    const user = JSON.parse(localStorage.user)
    const token = JSON.parse(localStorage.token);
    const tokenData = jwt_decode(token);

    const classes = useStyles();

    return(
        <Grid className={classes.addFormRoot} container justify='center'>   
            <ClickAwayListener onClickAway={onClose}>        
                <Card elevation={0} className={classes.addFormCard}>

                    <Grid container justify='flex-end'>
                        <Tooltip title='Close' >
                            <Button className={classes.closeBtn} onClick={()=> onClose()} variant='text' color='primary'>
                                <CloseIcon />
                            </Button>
                        </Tooltip>
                    </Grid>
                    
                    <Grid container justify='center' alignItems='center' direction='column' >
                        <img style={{width: '80px'}} src={logo} alt='logo' />
                        <Typography className={classes.typoPad} component="h1" variant="h5">
                            {tokenData.role.toUpperCase()}
                        </Typography>
                        <Typography className={classes.typoPad} >
                            {user.user.firstName} {user.user.lastName}
                        </Typography>
                        <Typography className={classes.typoPad} >
                            {user.user.email}
                        </Typography>
                    </Grid>

                    <AccountForm 
                        onClose={onClose} 
                        onUpdate={onUpdate}
                        onSucces={onSucces}
                    />
                    
                </Card>
            </ClickAwayListener>  
        </Grid>  
    )
}

export default Account;