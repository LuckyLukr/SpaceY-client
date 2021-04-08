import React from 'react';
import {
    Tooltip,
    IconButton,
} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import DeleteIcon from '@material-ui/icons/Delete';

function Table( {users}:any ) {

    const columns = [
        { field: 'name', headerName: 'Name', width: 160 },
        { field: 'age', headerName: 'Age', width: 100 },
        { field: 'email', headerName: 'Email', width: 230 },
        {  
            field: ' ', 
            headerName: " ",
            renderCell: () => (
                <Tooltip title='Delete' >
                    <IconButton color='primary' > 
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            )
        },
    ];

    const usersArray = users.map( (e:any) => { 
        return({
            id: e._id,
            key: e._id,
            name: e.name,
            age: e.age,
            email: e.email,
        })
     });

    return(
        <div>
            <DataGrid 
                rows={usersArray} 
                columns={columns}
                pageSize={7}
                autoHeight
                hideFooterSelectedRowCount
                showCellRightBorder
            />
        </div>
    )
}

export default Table;