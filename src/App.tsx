import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from 'axios';
import './App.css';

import { User, UserWithToken, Spacecraft } from './types';

import LoginPage from './components/loginComponents/loginPageComponent';
import OperatorDashboard from './components/operatorComponents/dashboardComponents/dashboardComponent';
import SignupPage from './components/signupComponents/signupPageComponent';
import AstronautsTable from './components/operatorComponents/astronautsComponent/astronautsComponent';
import SpacecraftsTable from './components/operatorComponents/spacecraftsComponent/spacecraftsComponent';
import Missions from './components/operatorComponents/missionsComponent/missionsComponent';
import SuccessBar from './components/confirmationComponents/successBarComponent';

function App() {
  const [ users, setUsers ] = useState<User[]>([]);
  const [ spacecrafts, setSpacecrafts ] = useState<Spacecraft[]>([]);
  const [ isSuccess, setIsSuccess ] = useState<boolean>(false);

  const API ='http://localhost:5000/';
  const user = JSON.parse(localStorage.user);

  useEffect(()=> {

      // GET USERS <---------------------------------------------------------|
    const fetchUsers = () => {
      const token = JSON.parse(localStorage.token);
      return new Promise( resolve => {
        axios.get(API + 'users',{ headers: {"Authorization" : `Bearer ${token}`}})
          .then( res => {
            resolve(res.data);
          })
          .catch( err => console.log(err));
      })
    };

    async function loadUsers() {
      const result = await fetchUsers() as User[];
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
      const result = await fetchSpacecrafts() as Spacecraft[];
      setSpacecrafts(result);
    }
    // -------------------------------------------------------------------------|

    if(!localStorage.user){
    localStorage.setItem('user', JSON.stringify(''));
    }

    loadSpacecrafts();
    loadUsers();
  
  },[]);

    // LOGIN <---------------------------------------------------------|

    const loginUser = async ( email: string, password: string) => {
      const login = { username: email, password: password };
      const result = await new Promise<UserWithToken>( resolve => {
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
  
  // REGISTER USER <-----------------------------------------------------|

  const addUser = async (
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        repeatPassword: string,
        role: string,
        age: number,
        birth: string,
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
      birth,
      consum, 
      weight, 
      onMission: false 
    };
    const token = JSON.parse(localStorage.token);
    const data = await axios.post(API + 'users', newOperator,{ headers: {"Authorization" : `Bearer ${token}`}}).catch(err => console.log(err));
    if (data) {
      const operator = JSON.parse(data.config.data);
      const operatorWithID = { id: data.data.id, ...operator};
      setUsers([ ...users, operatorWithID]);
    }
  }

  // REGISTER SPACECRAFT <-----------------------------------------------------|
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
    window.open('/', '_self');
  };

  // DELETE USER <--------------------------------------------------------|
  
  function deleteUser( id:string ) {
    const token = JSON.parse(localStorage.token);
    axios.delete(`${API}users/${id}`,{ headers: {"Authorization" : `Bearer ${token}`}}).catch(err => console.log(err));
    const copyUsers = [ ...users ];
    const index = copyUsers.findIndex( e => e.id === id);
    copyUsers.splice(index,1);
    setUsers(copyUsers);
  }

  // DELETE SPACECRAFT <--------------------------------------------------------|
  function deleteSpacecraft( id:string ) {
    axios.delete(`${API}spacecrafts/${id}`).catch(err => console.log(err));
    const copySpacecrafts = [ ...spacecrafts ];
    const index = copySpacecrafts.findIndex( e => e.id === id);
    copySpacecrafts.splice(index,1);
    setSpacecrafts(copySpacecrafts);
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

  function updateUser( id:string, update:User ) {
    const token = JSON.parse(localStorage.token);
    axios.patch(`${API}users/${id}`,update,{ headers: {"Authorization" : `Bearer ${token}`}} ).catch(err => alert(err));
    const copyUsers = [...users];
    copyUsers.forEach(e => {
      if(e.id === id){
        e.firstName = update.firstName;
        e.lastName = update.lastName;
        e.age = update.age;
        e.birth = update.birth;
        e.consum = update.consum;
        e.weight = update.weight;
      }
    });
    setUsers(copyUsers);
  }

    // CONFIRMATION BARS <--------------------------------------------------------|
    const handleSuccesBar = () => {
      setIsSuccess(true);
      setTimeout(()=> { setIsSuccess(false); }, 5000);
    }

  return ( 
    <Router>
          { isSuccess && <SuccessBar />}
          <Route path='/' exact render={() => 
            !user ?
            <LoginPage user={user} onLogin={loginUser} />
            :
            <OperatorDashboard 
              onLogout={logoutUser} 
              onUpdate={updateUser}
              onSucces={handleSuccesBar}
            />
            } />
          <Route path='/signup' render={() => <SignupPage onAdd={addUser} />} />
          <Route path='/astronauts' 
            render={() => 
              <AstronautsTable 
                onAdd={addUser} 
                users={users}
                onDelete={deleteUser}
                onUpdate={updateUser}
                onSucces={handleSuccesBar}
                onLogout={logoutUser} 
              />
            } 
          />
          <Route path='/spacecrafts' 
            render={() => 
              <SpacecraftsTable 
                onAdd={addSpacecraft} 
                spacecrafts={spacecrafts}
                onDelete={deleteSpacecraft}
                onDestroy={destroySpacecraft}
                onUpdate={updateUser}
                onSucces={handleSuccesBar}
                onLogout={logoutUser} 
              />
            }
          />
          <Route path='/makeMission' 
            render={() => 
              <Missions 
                users={users}
                spacecrafts={spacecrafts}
                onUpdate={updateUser}
                onSucces={handleSuccesBar}
                onLogout={logoutUser} 
              /> 
            } 
          />
    </Router>
  )
}

export default App;
