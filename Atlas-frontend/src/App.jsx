import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from './Components/Header/Header';
import Home from './Components/Home/Home';

import Menu from './Components/Menu/Menu';
import Login from './Components/Menu/Login/Login';
import Register from './Components/Menu/Register/Register';
import AddMovie from './Components/AddMovie/AddMovie';
import EditMovie from './Components/EditMovie/EditMovie';

import Ticket from './Components/Svg/Ticket';
import './App.css';

function App() {
  const [ani, setAni] = useState(true);

  return (
    <div className="container">
      <Header />
      <div className={`bg ${ani ? 'bg-animation' : ''}`} />
      <Switch>
        <Route exact path="/">
          <Ticket />
          <Menu setAni={setAni} />
        </Route>

        <Route path="/home">
          <Home />
        </Route>

        <Route path="/login">
          <Login setAni={setAni} />
        </Route>

        <Route path="/signup">
          <Register />
        </Route>

        <Route path="/add-movie">
          <AddMovie />
        </Route>

        <Route path="/edit-movie">
          <EditMovie />
        </Route>

        <Route path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
