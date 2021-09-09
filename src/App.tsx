import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useData } from './featrues/customHooks/useData';
import axios from 'axios';
import './App.css';

import { User, UserWithToken, Spacecraft, Mission } from './types';

import LoginPage from './components/loginComponents/loginPageComponent';
import Dashboard from './components/operatorComponents/dashboardComponents/dashboardComponent';
import SignupPage from './components/signupComponents/signupPageComponent';
import AstronautsTable from './components/operatorComponents/astronautsComponent/astronautsComponent';
import SpacecraftsTable from './components/operatorComponents/spacecraftsComponent/spacecraftsComponent';
import Missions from './components/operatorComponents/missionsComponent/missionsComponent';
import SuccessBar from './components/confirmationComponents/successBarComponent';

const API ='https://spaceyserver.herokuapp.com/';

function App() {
  const [ isSuccess, setIsSuccess ] = useState<boolean>(false);
  const [ loggedUser, setLoggedUser ] = useState<UserWithToken>({} as UserWithToken);
  const [ error, setError ] = useState<boolean>(false);
  const token = JSON.parse(localStorage.user).access_token;
  const users = useData<User>(API + "users", token);
  const spacecrafts = useData<Spacecraft>(API + "spacecrafts", token);
  const missions = useData<Mission>(API + "missions", token);

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.user));
  }, []);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(loggedUser));
  }, [loggedUser]);

  /**
  * Takes the given data (email and password) and returns the user from the database based on that data. 
  * Creates new token and saves the data to local storage.
  * If the data are wrong or the user does not exist, returns error.
  */
  const loginUser = async ( email: string, password: string) => {
    const login = { username: email, password: password };

    const fetchUser = async () => {
      const response = await axios.post(`${API}auth/login`, login);
      return response.data;
    }

    const getUser = async () => {
      try{
        const result = await fetchUser();
        localStorage.setItem('user', JSON.stringify(result));
        setLoggedUser(result);

      }catch( err:any ){
        setError(true);
      }
    }

    getUser();
  };

  /**
  * Clears all data from local storage and directs user to login page
  */
  const logoutUser = () => {
    localStorage.clear();
    localStorage.setItem('user', JSON.stringify(''));
    localStorage.setItem('token', JSON.stringify(''));
    window.open('/', '_self');
  };
  
  /**
  * Creates new user and save him in the database
  */
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
    const data = await axios.post(API + 'users', newOperator,{ headers: {"Authorization" : `Bearer ${loggedUser.access_token}`}}).catch(err => console.log(err));
    if (data) {
      const operator = JSON.parse(data.config.data);
      const operatorWithID = { id: data.data.id, ...operator};
      users.setData([ ...users.data, operatorWithID]);
    }
  }
  
  /**
  * Updates users data in the database
  */
  function updateUser( id:string, update:User ) {
    axios.patch(`${API}users/${id}`,update,{ headers: {"Authorization" : `Bearer ${loggedUser.access_token}`}} ).catch(err => alert(err));
    const copyUsers = [...users.data as User[]];
    copyUsers.forEach((e:User) => {
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
  
  /**
  * Remove the user from database
  */
  function deleteUser( id:string ) {
    axios.delete(`${API}users/${id}`,{ headers: {"Authorization" : `Bearer ${loggedUser.access_token}`}}).catch(err => console.log(err));
    const copyUsers = [ ...users.data as User[] ];
    const index = copyUsers.findIndex( e => e.id === id);
    copyUsers.splice(index,1);
    users.setData(copyUsers);
  }

  /**
  * Creates new spacecraft and save her in the database
  */
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

  /**
  * Updates spacecrafts data in the database
  */
  function updateSpacecraft( id:string, update:Spacecraft ) {
    axios.patch(`${API}spacecrafts/${id}`,update,{ headers: {"Authorization" : `Bearer ${loggedUser.access_token}`}} ).catch(err => alert(err));
    const copySpacecrafts = [...spacecrafts.data as Spacecraft[]];
    copySpacecrafts.forEach(e => {
      if(e.id === id){
        e.name = update.name;
        e.status = update.status;
        e.tankCondition = update.tankCondition;
      }
    });
    spacecrafts.setData(copySpacecrafts);
  }
  
  /**
  * Remove spacecraft from the database
  */
  function deleteSpacecraft( id:string ) {
    axios.delete(`${API}spacecrafts/${id}`).catch(err => console.log(err));
    const copySpacecrafts = [ ...spacecrafts.data as Spacecraft[] ];
    const index = copySpacecrafts.findIndex( e => e.id === id);
    copySpacecrafts.splice(index,1);
    spacecrafts.setData(copySpacecrafts);
  }


  /**
  * Updates spacecrafts data (status: Destroyed) in the database
  */
  function destroySpacecraft( id:string ) {
    axios.patch(`${API}spacecrafts/${id}`, {destroyed: true, status: 'Destroyed'}).catch(err => alert(err));

    const update = [...spacecrafts.data as Spacecraft[]];
    update.forEach(e => {
      if(e.id === id){
        e.status = 'Destroyed';
      }
    });
    spacecrafts.setData(update);
  }

  /**
  * Creates new mission and save her in the database
  */
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
   
  /**
  * Updates missions data in the database
  */
  function updateMission( id:string, update:Mission ){
    axios.patch(`${API}missions/${id}`,update,{ headers: {"Authorization" : `Bearer ${loggedUser.access_token}`}} ).catch(err => alert(err));

    const copyMissions = [...missions.data as Mission[]];
    copyMissions.forEach( (e:Mission) => {
      if(e.id === id){
        e.spacecraft = update.spacecraft;
        e.astronauts = update.astronauts;
        e.status = update.status;
        e.time = update.time;
        e.destination = update.destination;
      }
    })
  }

  // CONFIRMATION BARS <--------------------------------------------------------|
  const handleSuccesBar = () => {
    setIsSuccess(true);
    setTimeout(()=> { setIsSuccess(false); }, 5000);
  }



  function updateMissionStatus(){
    const newDate = new Date().setTime(new Date().getTime());

    missions.data.forEach( e => {
      if(newDate >= e.landing && e.status !== 'Mission failed'){
        e.status = 'Mission successful';
        e.spacecraft.status = 'on Earth';
        e.astronauts.forEach( (user:User) => {
          user.status = 'on Earth';
          updateUser(user.id, user);
        });
        updateSpacecraft(e.spacecraft.id, e.spacecraft);
        updateMission(e.id, e);
      }
      spacecrafts.data.forEach( i => {
        if(e.spacecraft.id === i.id && i.status === 'Destroyed'){
          e.status = 'Mission failed';
          e.spacecraft.status = 'Destroyed';
          e.astronauts.forEach( (user:User) => {
            user.status = 'Dead';
            updateUser(user.id, user);
          });
          updateMission(e.id, e);
        }
      })
    return
    })
  }

  return ( 
    <Router>
          { isSuccess && <SuccessBar />}
          <Route path='/' exact render={() => 
            !loggedUser.access_token ?
            <LoginPage user={loggedUser} onLogin={loginUser} />
            :
            <Dashboard 
              onLogout={logoutUser} 
              onUpdate={updateUser}
              onSucces={handleSuccesBar}
              missions={missions}
              user={loggedUser}
            />
            } />
          <Route path='/signup' render={() => <SignupPage onAdd={addUser} />} />
          <Route path='/astronauts' 
            render={() => 
              <AstronautsTable 
                onAdd={addUser} 
                users={users.data}
                user={loggedUser}
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
                user={loggedUser}
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
                user={loggedUser}
                users={users.data}
                spacecrafts={spacecrafts.data}
                onUserUpdate={updateUser}
                onSpacecraftUpdate={updateSpacecraft}
                onSucces={handleSuccesBar}
                onLogout={logoutUser} 
                addMission={addMission}
                missions={missions}
              /> 
            } 
          />
    </Router>
  )
}

export default App;
