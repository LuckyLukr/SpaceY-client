import {
    Tooltip,
    IconButton,
} from '@material-ui/core';
import { 
    DataGrid, 
    GridToolbar,
    GridCellParams  
} from '@material-ui/data-grid';

import CachedIcon from '@material-ui/icons/Cached';
import WarningIcon from '@material-ui/icons/Warning';

import { Spacecraft } from '../../../types';

function Table( {spacecrafts, onDelete, onDestroy}:any ) {

    const columns = [
                { field: 'name', headerName: 'Name', width: 160 },
                { field: 'type', headerName: 'Model', width: 160 },
                { field: 'weight', headerName: 'Weight', width: 160 },
                { field: 'seats', headerName: 'Number of seats', width: 160 },
                { field: 'tankCapacity', headerName: 'Fuel tank capacity' , width: 160 },
                { field: 'tankCondition', headerName: 'Fuel tank condition', width: 160 },
                { field: 'fridge', headerName: 'Fridge capacity', width: 160 },
                { field: 'motorImpulse', headerName: 'Specific motor impulse', width: 160 },
                { field: 'status', headerName: 'Status', width: 160 },
                {  
                    field: 'delete',
                    headerName: " ",
                    renderCell: (params:GridCellParams) => {
                        return (
                            <>
                            {
                                params.row.status === 'on mission' 
                                ?
                                <Tooltip title='DESTROY' onClick={() => onDestroy(params.row.id)} >
                                    <IconButton > 
                                        <WarningIcon color='error' />
                                    </IconButton>
                                </Tooltip>
                                :
                                <Tooltip title='Scrap' onClick={() => onDelete(params.row.id)} >
                                    <IconButton color='primary' > 
                                        <CachedIcon />
                                    </IconButton>
                                </Tooltip>
                            }
                            </>
                        )
                    }
                },
    ];

    const SCsArray = spacecrafts.map( (e:Spacecraft) => { 

        const status = e.destroyed ? 'destroyed' : e.onMission ? 'on mission' : 'ready to depart';

        return({
            id: e.id,
            key: e.id,
            weight: `${e.weight} t`,
            name: e.name,
            type: e.type,
            seats: e.seats,
            tankCapacity: `${e.tankCapacity} l`,
            tankCondition: `${e.tankCondition} %`,
            motorImpulse: e.motorImpulse,
            fridge: `${e.fridge} kg`,
            status: status
        })
     });


    return(
        <div>
            <DataGrid 
                rows={SCsArray} 
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