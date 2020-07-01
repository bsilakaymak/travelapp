import React from 'react';
import LandingPage from './components/layout/LandingPage';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Place from './components/place/Place';
import CreatePlace from './components/place/CreatePlace';
import PlaceItem from './components/place/PlaceItem';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/signup' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/place' component={Place} />
        <Route exact path='/create-place' component={CreatePlace} />
        <Route exact path='/place/:placeId' component={PlaceItem} />
      </Switch>
    </Router>
  );
}

export default App;
