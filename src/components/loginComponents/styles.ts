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
        letterSpacing: '3vw',
        textIndent: '1.5vw',
        color: 'white',
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
        width: '140px'
    }
  }));