import { useState } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useData } from './featrues/customHooks/useData';
import axios from 'axios';
import './App.css';

import { User, UserWithToken, Spacecraft, Mission } from './types';

import LoginPage from './components/loginComponents/loginPageComponent';
import OperatorDashboard from './components/operatorComponents/dashboardComponents/dashboardComponent';
import SignupPage from './components/signupComponents/signupPageComponent';
import AstronautsTable from './components/operatorComponents/astronautsComponent/astronautsComponent';
import SpacecraftsTable from './components/operatorComponents/spacecraftsComponent/spacecraftsComponent';
import Missions from './components/operatorComponents/missionsComponent/missionsComponent';
import SuccessBar from './components/confirmationComponents/successBarComponent';

const API ='http://localhost:5000/';
const user = JSON.parse(localStorage.user);
const token = JSON.parse(localStorage.token);

function App() {
  const [ isSuccess, setIsSuccess ] = useState<boolean>(false);
  const users = useData(API + "users", token);
  const spacecrafts = useData(API + "spacecrafts", token);
  const missions = useData(API + "missions", token);

    // LOGIN <---------------------------------------------------------|

    const loginUser = async ( email: string, password: string) => {
      const login = { username: email, password: password };
      const result = await new Promise<UserWithToken>( resolve => {
        axios.post(`${API}auth/login`,login)
            .then( res => {
            resolve(res.data);
            })
            .catch( err =>  alert(err.message));
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
      status: 'on Earth'
    };
    const token = JSON.parse(localStorage.token);
    const data = await axios.post(API + 'users', newOperator,{ headers: {"Authorization" : `Bearer ${token}`}}).catch(err => console.log(err));
    if (data) {
      const operator = JSON.parse(data.config.data);
      const operatorWithID = { id: data.data.id, ...operator};
      users.setData([ ...users.data, operatorWithID]);
    }
  }

  // REGISTER SPACECRAFT <-----------------------------------------------------|
  const addSpacecraft = async ( 
        name: string, 
        type: string, 
        weight: number,
        status: string,
        seats: number, 
        tankCapacity: number, 
        motorImpulse: number, 
        fuelConsumption: number,
        startCombustion: number,
        landingCombustion: number,
        fridge: number 
  ) => {
    const newSpacecraft = { 
      name,     
      type,
      weight,
      status,
      destroyed: false,
      seats,
      tankCapacity,
      tankCondition: 100,
      motorImpulse,
      fuelConsumption,
      startCombustion,
      landingCombustion,
      fridge,
    };
    const data = await axios.post(API + 'spacecrafts', newSpacecraft).catch(err => console.log(err));
    if (data) {
      const spacecraft = JSON.parse(data.config.data);
      const spacecraftWithID = { id: data.data.id, ...spacecraft};
      spacecrafts.setData([ ...spacecrafts.data, spacecraftWithID]);
    }
  }

  // REGISTER MISSION <-----------------------------------------------------|

  const addMission = async ( e:Mission ) => {
    const newMission = { 
      name: e.name,     
      spacecraft: e.spacecraft,
      astronauts: e.astronauts,
      status: `Flying to ${e.destination}`,
      blastOff: e.blastOff,
      landing: e.landing,
      destination: e.destination,
      distance: e.distance,
      time: e.time
    };
    const data = await axios.post(API + 'missions', newMission).catch(err => console.log(err));
    if (data) {
      const mission = JSON.parse(data.config.data);
      const missionWithID = { id: data.data.id, ...mission};
      missions.setData([ ...missions.data, missionWithID]);
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
    const copyUsers = [ ...users.data as User[] ];
    const index = copyUsers.findIndex( e => e.id === id);
    copyUsers.splice(index,1);
    users.setData(copyUsers);
  }

  // DELETE SPACECRAFT <--------------------------------------------------------|
  function deleteSpacecraft( id:string ) {
    axios.delete(`${API}spacecrafts/${id}`).catch(err => console.log(err));
    const copySpacecrafts = [ ...spacecrafts.data as Spacecraft[] ];
    const index = copySpacecrafts.findIndex( e => e.id === id);
    copySpacecrafts.splice(index,1);
    spacecrafts.setData(copySpacecrafts);
  }

  // UPDATE <--------------------------------------------------------|

  function destroySpacecraft( id:string ) {
    axios.patch(`${API}spacecrafts/${id}`, {destroyed: true, status: 'Destroyed'}).catch(err => alert(err));

    const update = [...spacecrafts.data as Spacecraft[]];
    update.forEach(e => {
      if(e.id === id){
        e.destroyed = true;
        e.status = 'Destroyed';
      }
    });
    spacecrafts.setData(update);
  }

  function updateSpacecraft( id:string, update:Spacecraft ) {
    const token = JSON.parse(localStorage.token);
    axios.patch(`${API}spacecrafts/${id}`,update,{ headers: {"Authorization" : `Bearer ${token}`}} ).catch(err => alert(err));
    const copySpacecrafts = [...spacecrafts.data as Spacecraft[]];
    copySpacecrafts.forEach(e => {
      if(e.id === id){
        e.name = update.name;
        e.status = update.status;
        e.destroyed = update.destroyed;
        e.tankCondition = update.tankCondition;
      }
    });
    spacecrafts.setData(copySpacecrafts);
  }

  function updateUser( id:string, update:User ) {
    const token = JSON.parse(localStorage.token);
    axios.patch(`${API}users/${id}`,update,{ headers: {"Authorization" : `Bearer ${token}`}} ).catch(err => alert(err));
    const copyUsers = [...users.data as User[]];
    copyUsers.forEach(e => {
      if(e.id === id){
        e.firstName = update.firstName;
        e.lastName = update.lastName; 
        e.age = update.age;
        e.birth = update.birth;
        e.consum = update.consum;
        e.weight = update.weight;
        e.status = update.status
      }
    });
    users.setData(copyUsers);
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
                users={users.data}
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
                spacecrafts={spacecrafts.data}
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
                user={user}
                users={users.data}
                spacecrafts={spacecrafts.data}
                onUserUpdate={updateUser}
                onSpacecraftUpdate={updateSpacecraft}
                onSucces={handleSuccesBar}
                onLogout={logoutUser} 
                addMission={addMission}
              /> 
            } 
          />
    </Router>
  )
}

export default App;
