import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from 'axios';

import LoginPage from './components/loginComponents/loginPageComponent';
import OperatorDashboard from './components/operatorComponents/dashboardComponents/dashboardComponent';
import SignupPage from './components/signupComponents/signupPageComponent';
import AstronautsTable from './components/operatorComponents/astronautsComponent/astronautsComponent';
import SpacecraftsTable from './components/operatorComponents/spacecraftsComponent/spacecraftsComponent';

function App() {
  const [ users, setUsers ] = useState<any>([]);

  const API ='http://localhost:5000/';
  const user = JSON.parse(localStorage.user);

  // GET USERS <---------------------------------------------------------|

  useEffect(()=> {
    const fetchUsers = () => {
      const token = JSON.parse(localStorage.token);
      return new Promise( resolve => {
        axios.get(API + 'users',{ headers: {"Authorization" : `Bearer ${token}`} })
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

    if(!localStorage.user){
    localStorage.setItem('user', JSON.stringify(''));
    }
    loadUsers();
  
  },[]);

    // LOGIN <---------------------------------------------------------|

    const loginUser = async ( email: string, password: string) => {
      const login = { username: email, password: password };
      const result = await new Promise<any>( resolve => {
        axios.post(`${API}auth/login`,login)
            .then( res => {
            resolve(res.data);
            })
            .catch( err =>  alert(err));
        })

      if(result){
        const token = result.access_token;
        localStorage.clear();
        localStorage.setItem('user', JSON.stringify(result));
        localStorage.setItem('token', JSON.stringify(token));
      }
      
  };
  
  // REGISTER <-----------------------------------------------------|

  const addUser = async (
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        repeatPassword: string,
        role: string,
        age: number,
        consum: number,
        weight: number
    ) => {
    const newOperator = { firstName, lastName, email, password, repeatPassword, role, age, consum, weight, onMission: false };
    const data = await axios.post(API + 'users', newOperator).catch(err => console.log(err));
    if (data) {
      const operator = JSON.parse(data.config.data);
      const operatorWithID = { id: data.data.id, ...operator};
      setUsers([ ...users, operatorWithID]);
    }
    return console.log(data);
  }

  // LOGOUT <--------------------------------------------------------|

  const logoutUser = () => {
    localStorage.clear();
    localStorage.setItem('user', JSON.stringify(''));
    localStorage.setItem('token', JSON.stringify(''));
  };

  // DELETE <--------------------------------------------------------|
  
  function deleteUser( id:string ) {
    axios.delete(`${API}users/${id}`).catch(err => console.log(err));
    const copyUsers = [ ...users ];
    const index = copyUsers.findIndex( e => e.id === id);
    copyUsers.splice(index,1);
    setUsers(copyUsers);
    console.log(users);
  }

  return ( 
    <Router>
          <Route path='/' exact render={() => 
            !user ?
            <LoginPage user={user} onLogin={loginUser} />
            :
            <OperatorDashboard onLogout={logoutUser} />
            } />
          <Route path='/signup' render={() => <SignupPage onAdd={addUser} />} />
          <Route path='/astronauts' render={() => <AstronautsTable onAdd={addUser} users={users} onLogout={logoutUser} onDelete={deleteUser} />} />
          <Route path='/spacecrafts' render={() => <SpacecraftsTable onAdd={addUser} users={users} onLogout={logoutUser} onDelete={deleteUser} />} />
    </Router>
  )
}

export default App;
