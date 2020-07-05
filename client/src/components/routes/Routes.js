import React, { useEffect } from 'react'
import LandingPage from '../layout/LandingPage'
import Register from '../auth/Register'
import Login from '../auth/Login'
import Dashboard from '../dashboard/Dashboard'
import Place from '../place/Place'
import PlaceItem from '../place/PlaceItem'
import Navbar from '../layout/Navbar'
import CreatePlace from '../place/CreatePlace'
import setAuthToken from '../../utils/setAuthToken';


import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import {loadUser} from '../../actions/auth'

import { useDispatch } from 'react-redux'

if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
function Routes() {
    // const dispatch = useDispatch()
    // useEffect(()=>{dispatch(loadUser())},[])
    return (
            <Router>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={LandingPage} />
                    <Route exact path="/signup" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/place" component={Place} />
                    <Route exact path="/create-place" component={CreatePlace} />
                    <Route exact path="/place/:placeId" component={PlaceItem} />
                </Switch>
            </Router>
    )
}

export default Routes