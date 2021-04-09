import React from 'react';
import {
    Tooltip,
    IconButton,
    Button
} from '@material-ui/core';
import { DataGrid, GridToolbar  } from '@material-ui/data-grid';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

function Table( {users,onDelete}:any ) {

    const columns = [
        { field: 'name', headerName: 'Name', width: 160 },
        { field: 'email', headerName: 'Email', width: 180 },
        { field: 'role', headerName: 'Role', width: 160 },
        { field: 'age', headerName: 'Age', width: 90 },
        { field: 'consum', headerName: 'Food consumption / hour (g)' , width: 140 },
        { field: 'weight', headerName: 'Weight (kg)', width: 90 },
        {  
            field: '-', 
            headerName: " ",
            renderCell: () => (
                <Tooltip title='Edit' >
                    <Button color='primary' > 
                        <EditIcon />
                    </Button>
                </Tooltip>
            )
        },
        {  
            field: ' ', 
            headerName: " ",
            renderCell: (params:any) => (
                <Tooltip title='Delete' onClick={() => onDelete(params.row.id)} >
                    <IconButton color='primary' > 
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            )
        },
    ];

    const user = users.map( (e:any) => { 
        return({
            id: e.id,
            key: e.id,
            name: `${e.firstName} ${e.lastName}`,
            email: e.email,
            role: e.role,
            age: e.age,
            consum: e.consum,
            weight: e.weight
        })
     });

     const astronauts = user.filter( (e:any) => e.role === 'operator');


    return(
        <div>
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