import {
    Typography,
    Grid,
    makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    stripes: {
        width: '100%',
        overflow: 'hidden',
    },
    stripeText: {
        fontSize: '37px',
        background: '#e20000',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundSize: '100px 100px',
        fontWeight: 'bold',
        padding: '4px',
        textAlign: 'center',
        
    },
    stripeTextContainer: {
        backgroundImage: 'linear-gradient(45deg, #ebeb00 25%, #262626 25%, #262626 50%, #ebeb00 50%, #ebeb00 75%, #262626 75%, #262626 100%)',
        backgroundSize: '100px 100px',
        width: '250%',
        animation: '$move 20s infinite linear',
    },
    "@keyframes move": {
        '0%': {
            marginLeft: '-150%',
        },
        '100%': {
            marginLeft: '0%',
        },
    },
}))

export default function UnderConstruction() {
    const classes = useStyles();

    return(
        <Grid className={classes.stripes}>
            <div className={classes.stripeTextContainer}>
                <Typography className={classes.stripeText} >
                    ! UNDER CONSTRUCTION !
                </Typography>
            </div>
        </Grid>
    )
}