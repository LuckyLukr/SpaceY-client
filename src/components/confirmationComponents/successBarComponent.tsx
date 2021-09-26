import {
    Grid,
    Typography,
    makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(()=>({
    root: {
        position: 'fixed',
        top: 0,
        backgroundColor: 'rgb(42 151 47 / 90%)',
        color: 'white',
        width: '100%',
        height: '10vh',
        animation: '$disappear 5s linear',
        zIndex: 1000,
        textAlign: 'center'
    },
    "@keyframes disappear": {
        '0%': {
            opacity: 1
        },
        '75%': {
            opacity: 1
        },
        '100%': {
            opacity: 0
        }
      }
}))

function SuccessBar( {text}:any ) {
    const classes = useStyles();

    return (
        <Grid container justify='center' alignItems='center' className={classes.root}>
           <Typography>{text}</Typography>
        </Grid>
    )
}

export default SuccessBar;