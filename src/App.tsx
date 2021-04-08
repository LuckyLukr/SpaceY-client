import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from 'axios';

import LoginPage from './components/loginComponents/loginPageComponent';
import OperatorDashboard from './components/operatorComponents/dashboardComponent';
import SignupPage from './components/loginComponents/signupPageComponent';
import AstronautsTable from './components/operatorComponents/astronautsComponent/astronautsComponent';

function App() {
  const [ users, setUsers ] = useState([]);

  useEffect(()=> {
    const fetchUsers = () => {
      return new Promise( resolve => {
        axios.get(API)
          .then( res => {
            resolve(res.data);
          })
          .catch( err => console.log(err) );
      })
    };

    async function loadUsers() {
      const result = await fetchUsers() as any;
      setUsers(result);
    }

    loadUsers();
  },[]);

  const API = 'http://localhost:5000/';

  return (
    <Router>
      <Route path='/' exact component={LoginPage} />
      <Route path='/signup' component={SignupPage} />
      <Route path='/dashboard' component={OperatorDashboard} />
      <Route path='/astronauts' render={() => <AstronautsTable users={users} />} />
      <Route path='/spacecrafts' component={OperatorDashboard} />
    </Router>
  )
}

export default App;
