import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from 'axios';

import LoginPage from './components/loginComponents/loginPageComponent';
import OperatorDashboard from './components/operatorComponents/dashboardComponents/dashboardComponent';
import SignupPage from './components/signupComponents/signupPageComponent';
import AstronautsTable from './components/operatorComponents/astronautsComponent/astronautsComponent';

import { User } from './types';

function App() {
  const [ users, setUsers ] = useState<User[]>([]);
  const API = 'http://localhost:5000/users/';

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

  function addUser(
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        repeatPassword: string,
        role: string
    ) {
    const newOperator = { firstName, lastName, email, password, repeatPassword, role, age: 60, consum: 150, weight: 90 };
    axios.post(API, newOperator).catch(err => console.log(err));
    setUsers([...users, newOperator]);
}

  function deleteUser( id:any ) {
    axios.delete(API + id).catch(err => console.log(err));
  }

  return (
    <Router>
      <Route path='/' exact component={LoginPage} />
      <Route path='/signup' render={() => <SignupPage onAdd={addUser} />} />
      <Route path='/dashboard' component={OperatorDashboard} />
      <Route path='/astronauts' render={() => <AstronautsTable users={users} onDelete={deleteUser} />} />
      <Route path='/spacecrafts' component={OperatorDashboard} />
    </Router>
  )
}

export default App;
