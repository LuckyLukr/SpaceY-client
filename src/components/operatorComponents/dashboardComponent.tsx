import React from 'react';
import {
    Typography
} from '@material-ui/core';

import Navbar from '../navbarComponent';
import OperatorNavbar from './operatorNavbar';

export default function OperatorDashboard() {

    return(
        <div>
            <Navbar />
            <OperatorNavbar />
            <Typography>
                Welcome OPERATOR, this is your dashboard. ENJOY!
            </Typography>
        </div>
    )
}