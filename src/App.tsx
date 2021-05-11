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
  const [ spacecrafts, setSpacecrafts ] = useState<any>([]);

  const API ='http://localhost:5000/';
  const user = JSON.parse(localStorage.user);

  useEffect(()=> {

      // GET USERS <---------------------------------------------------------|
    const fetchUsers = () => {
      const token = JSON.parse(localStorage.token);
      return new Promise( resolve => {
        axios.get(API + 'users',{ headers: {"Authorization" : `Bearer ${token}`} })
          .then( res => {
            resolve(res.data);
          })
          .catch( err => console.log(err));
      })
    };

    async function loadUsers() {
      const result = await fetchUsers() as any;
      setUsers(result);
    }

  // GET SPACECRAFTS <---------------------------------------------------------|
    const fetchSpacecrafts = () => {
      return new Promise( resolve => {
        axios.get(API + 'spacecrafts')
          .then( res => {
            resolve(res.data);
          })
          .catch( err => console.log(err));
      })
    };

    const loadSpacecrafts = async () => {
      const result = await fetchSpacecrafts() as any;
      setSpacecrafts(result);
    }

    if(!localStorage.user){
    localStorage.setItem('user', JSON.stringify(''));
    }

    loadSpacecrafts();
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
    const newOperator = { 
      firstName, 
      lastName, 
      email, 
      password, 
      repeatPassword, 
      role, 
      age, 
      consum, 
      weight, 
      onMission: false };
    const data = await axios.post(API + 'users', newOperator).catch(err => console.log(err));
    if (data) {
      const operator = JSON.parse(data.config.data);
      const operatorWithID = { id: data.data.id, ...operator};
      setUsers([ ...users, operatorWithID]);
    }
  }

  const addSpacecraft = async ( 
        name: string, 
        type: string, 
        weight: number, 
        seats: number, 
        tankCapacity: number, 
        motorImpulse: number, 
        fridge: number 
  ) => {
    const newSpacecraft = { 
      name,     
      type,
      weight,
      onMission: false,
      destroyed: false,
      seats,
      tankCapacity,
      tankCondition: 100,
      motorImpulse,
      fridge,
    };
    const data = await axios.post(API + 'spacecrafts', newSpacecraft).catch(err => console.log(err));
    if (data) {
      const spacecraft = JSON.parse(data.config.data);
      const spacecraftWithID = { id: data.data.id, ...spacecraft};
      setSpacecrafts([ ...spacecrafts, spacecraftWithID]);
    }
  }

  // LOGOUT <--------------------------------------------------------|

  const logoutUser = () => {
    localStorage.clear();
    localStorage.setItem('user', JSON.stringify(''));
    localStorage.setItem('token', JSON.stringify(''));
  };

  // DELETE <--------------------------------------------------------|
  
  function deleteUser( id:string ) {
    const token = JSON.parse(localStorage.token);
    axios.delete(`${API}users/${id}`,{ headers: {"Authorization" : `Bearer ${token}`}}).catch(err => console.log(err));
    const copyUsers = [ ...users ];
    const index = copyUsers.findIndex( e => e.id === id);
    copyUsers.splice(index,1);
    setUsers(copyUsers);
    console.log(users);
  }

  function deleteSpacecraft( id:string ) {
    axios.delete(`${API}spacecrafts/${id}`).catch(err => console.log(err));
    const copySpacecrafts = [ ...spacecrafts ];
    const index = copySpacecrafts.findIndex( e => e.id === id);
    copySpacecrafts.splice(index,1);
    setSpacecrafts(copySpacecrafts);
    console.log(spacecrafts);
  }

  // UPDATE <--------------------------------------------------------|

  function destroySpacecraft( id:string ) {
    axios.patch(`${API}spacecrafts/${id}`, {destroyed: true, onMission: false}).catch(err => alert(err));

    const update = [...spacecrafts];
    update.forEach(e => {
      if(e.id === id){
        e.destroyed = true;
        e.onMission = false;
      }
    });
    setSpacecrafts(update);
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
          <Route path='/astronauts' render={() => <AstronautsTable 
                                                      onAdd={addUser} 
                                                      users={users} 
                                                      onLogout={logoutUser}
                                                      onDelete={deleteUser} 
                                                  />} 
          />
          <Route path='/spacecrafts' render={() => <SpacecraftsTable 
                                                      onAdd={addSpacecraft} 
                                                      spacecrafts={spacecrafts} 
                                                      onLogout={logoutUser} 
                                                      onDelete={deleteSpacecraft}
                                                      onDestroy={destroySpacecraft}
                                                    />} 
          />
    </Router>
  )
}

export default App;
