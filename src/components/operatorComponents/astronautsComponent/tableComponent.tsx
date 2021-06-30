import { useState } from 'react';
import {
    Tooltip,
    Button,
    ButtonGroup,
    Grid,
    ClickAwayListener,
    Card,
    makeStyles
} from '@material-ui/core';
import { 
    DataGrid, 
    GridToolbar,
    GridCellParams
} from '@material-ui/data-grid';

import UpdateAstronaut from './updateAstronaut';
import { User } from '../../../types';

import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme)=>({
    addFormCard: {
        height: 430,
        [theme.breakpoints.down('xs')]: {
            height: 650,
        },
        maxWidth: 600,
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
    }
}))

function Table( {users, onDelete, onUpdate, onSucces}:any ) {
    const [ astronaut, setAstronaut ] = useState({});
    const [ append, setAppend ] = useState(false);

    const classes = useStyles();

    const handleAppend = () => setAppend(!append);
    const handleClickAway = () => setAppend(false);

    const editAstronaut = (e:any) => {
        const edit = {
            id: e.id,
            firstName: e.firstName,
            lastName: e.lastName,
            age: e.age,
            birth: e.birth,
            consum: e.consum,
            weight: e.weight
        }
        setAstronaut(edit);
        handleAppend();
    }

    const columns = [
        { field: 'name', headerName: 'Name', width: 160 },
        { field: 'email', headerName: 'Email', width: 180 },
        { field: 'age', headerName: 'Age', width: 90 },
        { field: 'consum', headerName: 'Food consumption / hour (g)' , width: 140 },
        { field: 'weight', headerName: 'Weight (kg)', width: 90 },
        {  
            field: '-', 
            headerName: " ",
            width: 150,
            renderCell: (params:GridCellParams) => (
                <ButtonGroup color='primary' size='small' variant='text' >
                    <Tooltip title='Edit' onClick={() => editAstronaut(params.row)} >
                        <Button> 
                            <EditIcon />
                        </Button>
                    </Tooltip>
                    <Tooltip title='Delete' onClick={() => onDelete(params.row.id)} >
                        <Button > 
                            <DeleteIcon />
                        </Button>
                    </Tooltip>
                </ButtonGroup>
            )
        },
    ];

    const user = users.map( (e:User) => { 
        return({
            id: e.id,
            key: e.id,
            name: `${e.firstName} ${e.lastName}`,
            firstName: e.firstName,
            lastName: e.lastName,
            email: e.email,
            role: e.role,
            age: e.age,
            birth: e.birth,
            consum: e.consum,
            weight: e.weight
        })
     });

     const astronauts = user.filter( (e:User) => e.role === 'astronaut');

    return(
        <div>
            { append && 
            <Grid className={classes.addFormRoot} container justify='center'>   
                <ClickAwayListener onClickAway={handleClickAway}>        
                    <Card elevation={0} className={classes.addFormCard}>

                        <Grid container justify='flex-end'>
                            <Tooltip title='Close' >
                                <Button className={classes.closeBtn} onClick={()=> handleAppend()} variant='text' color='primary'>
                                    <CloseIcon />
                                </Button>
                            </Tooltip>
                        </Grid>

                        <UpdateAstronaut onSucces={onSucces} astronaut={astronaut} onUpdate={onUpdate} onAppend={handleAppend} /> 

                    </Card>
                </ClickAwayListener>  
            </Grid> 
            }
            
            <DataGrid 
                rows={astronauts} 
                columns={columns}
                pageSize={7}
                autoHeight
                hideFooterSelectedRowCount
                showCellRightBorder
                components={{
                    Toolbar: GridToolbar,
                }}
            />
        </div>
    )
}

export default Table;