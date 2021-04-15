import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import axios from 'axios';
import sha1 from 'js-sha1';

import LoginPage from './components/loginComponents/loginPageComponent';
import OperatorDashboard from './components/operatorComponents/dashboardComponents/dashboardComponent';
import SignupPage from './components/signupComponents/signupPageComponent';
import AstronautsTable from './components/operatorComponents/astronautsComponent/astronautsComponent';

function App() {
  const [ users, setUsers ] = useState<any>([]);
  const [ user, setUser ] = useState(null);

  const API ='http://localhost:5000/users/';

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
  

  // REGISTER <-----------------------------------------------------|

  const addUser = (
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        repeatPassword: string,
        role: string
    ) => {
    const newOperator = { firstName, lastName, email, password, repeatPassword, role, age: 30, consum: 0, weight: 0, onMission: false };
    console.log(newOperator);
    axios.post(API, newOperator).catch(err => console.log(err));
    setUsers([...users, newOperator]);
  }

  // LOGIN <---------------------------------------------------------|

  const loginUser = async ( email: string, password: string) => {
      const hashedPass = sha1(password);    
      const login = { email: email, password: hashedPass };
      const result = await new Promise<any>( resolve => {
        axios.post(`${API}login`,login)
            .then( res => {
            resolve(res.data);
            })
            .catch( err =>  alert(err));
        })

      if(result){
        setUser(result);
        localStorage.clear();
        localStorage.setItem('user', JSON.stringify(result));
        window.location.href = '/dashboard';
      }
      
  };

  // LOGOUT <--------------------------------------------------------|

  const logoutUser = () => {
    setUser(null);
    localStorage.clear();
    localStorage.setItem('user', JSON.stringify(null));
  };

  // DELETE <--------------------------------------------------------|
  function deleteUser( id:string ) {
    axios.delete(API + id).catch(err => console.log(err));
    const copyUsers = [ ...users ];
    const index = copyUsers.findIndex( e => e.id === id);
    copyUsers.splice(index,1);
    setUsers(copyUsers);
    console.log(users);
  }

  return ( 
    <Router>
          <Route path='/' exact render={() => <LoginPage user={user} onLogin={loginUser} />} />
          <Route path='/signup' render={() => <SignupPage onAdd={addUser} />} />
          <Route path='/dashboard' render={() => <OperatorDashboard onLogout={logoutUser} />} />
          <Route path='/astronauts' render={() => <AstronautsTable users={users} onDelete={deleteUser} />} />
          <Route path='/spacecrafts' component={OperatorDashboard} />
    </Router>
  )
}

export default App;
