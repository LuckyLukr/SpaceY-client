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
        { field: 'type', headerName: 'Type', width: 160 },
        { field: 'weight', headerName: 'Weight (t)', width: 160 },
        { field: 'seats', headerName: 'Number of seats', width: 160 },
        { field: 'tankCapacity', headerName: 'Fuel tank capacity (l)' , width: 160 },
        { field: 'tankCondition', headerName: 'Fuel tank condition', width: 160 },
        { field: 'fridge', headerName: 'Fridge capacity (kg)', width: 160 },
        { field: 'motorImpulse', headerName: 'Specific motor impulse', width: 160 },
        { field: 'status', headerName: 'Status', width: 160 },
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

    const spacecrafts = [
        {
            id: 0,
            name: 'Tweak',
            type: 'Falcon 19',
            weight: 80,
            seats: 4,
            tankCapacity: 12000,
            tankCondition: `${100}%`,
            fridge: 300,
            motorImpulse: 7000,
            status: 'Out of mission'
        },
        {
            id: 1,
            name: 'Peak',
            type: 'Falcon 19',
            weight: 80,
            seats: 4,
            tankCapacity: 12000,
            tankCondition: `${100}%`,
            fridge: 300,
            motorImpulse: 7000,
            status: 'Out of mission'
        },
        {
            id: 2,
            name: 'Leak',
            type: 'Falcon 20',
            weight: 75,
            seats: 4,
            tankCapacity: 10000,
            tankCondition: `${100}%`,
            fridge: 350,
            motorImpulse: 8000,
            status: 'Out of mission'
        },
        {
            id: 3,
            name: 'Sneak',
            type: 'Starlighter',
            weight: 290,
            seats: 14,
            tankCapacity: 280000,
            tankCondition: `${87}%`,
            fridge: 10000,
            motorImpulse: 28000,
            status: 'Out of mission'
        }
    ]


    return(
        <div>
            <DataGrid 
                rows={spacecrafts} 
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