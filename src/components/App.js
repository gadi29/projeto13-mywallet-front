import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import UserContext from '../contexts/UserContext';

import '../assets/css/reset.css';
import '../assets/css/styles.css';

import Main from './Main';
import Login from './Login';
import Register from './Register';
import NewEntry from './NewEntry';
import NewExit from './NewExit';
import EditEntry from './EditEntry';
import EditExit from './EditExit';

function App() {
  let userStorage = localStorage.getItem("user");

  if (userStorage !== null) {
    userStorage = JSON.parse(userStorage);
  }

  const [user, setUser] = useState(userStorage);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Main /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='/register' element={ <Register /> } />
          <Route path='/new_entry' element={ <NewEntry /> } />
          <Route path='/new_exit' element={ <NewExit /> } />
          <Route path='/edit_entry?idEntry' element={ <EditEntry /> } />
          <Route path='/edit_exit?idExit' element={ <EditExit /> } />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;