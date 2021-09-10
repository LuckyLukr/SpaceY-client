import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '20px 0px',
      padding: '10px 0px',
      width: '100%',
      backgroundColor: '#ffffffbf'
    },
    form: {
      width: '35%',
      [theme.breakpoints.down('sm')]: {
          width: '50%',
      },
      [theme.breakpoints.down('xs')]: {
          width: '90%',
      },
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    link: {
      color: "#07283f"
    },
    headerTypo: {
        fontFamily: "'Zen Dots', cursive",
        letterSpacing: '3vw',
        textIndent: '1.5vw',
        color: 'rgb(230,230,230,0.8)',
        fontSize: '90px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '60px',
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '35px',
        },
    },
    subTypo: {
        color: 'white',
        letterSpacing: '2vw',
        textAlign: 'center',
    },
    yImg: {
        width: '130px',
        animation: '$rotation 20s infinite linear',
        cursor: 'none',
        '&:hover': {
          animation: '$rotation 0.1s infinite cubic-bezier(0.01, 1.1, 1, 0.09)',
        }
    },
    "@keyframes rotation": {
      '0%': {
        transform:'rotate3d(0, 1, 0, 0deg)',
        opacity: 1,
      },
      '25%': {
        transform:'rotate3d(0, 1, 0, 90deg)',
        opacity: 0.4,
      },
      '26%': {
        transform:'rotate3d(0, 1, 0, 92deg)',
        opacity: 1,
      },
      '50%': {
        transform:'rotate3d(0, 1, 0, 180deg)',
        opacity: 1,
      },
      '75%': {
        transform:'rotate3d(0, 1, 0, 270deg)',
        opacity: 0.4,
      },
      '76%': {
        transform:'rotate3d(0, 1, 0, 272deg)',
        opacity: 1,
      },
      '100%': {
        transform:'rotate3d(0, 1, 0, 359deg)',
        opacity: 1,
      },
    },
    headerImg: {
      width: '100vw',
      height: '100vh',
    },
    headerFilter: {
        width: '100%',
        height: '100%',
        backgroundColor: '#0000001a',
    },
    buttonFlex: {
      flexWrap: 'wrap',
      color: 'white',
      zIndex: 2,
      position: 'absolute',
      top: 0,
      right: 0
    },
    button: {
      color: 'white',
    },
  }));