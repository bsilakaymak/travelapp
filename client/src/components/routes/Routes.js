import React, { useEffect } from 'react'
import LandingPage from '../layout/LandingPage'
import Register from '../auth/Register'
import Login from '../auth/Login'
import Dashboard from '../dashboard/Dashboard'
import Places from '../place/Places'
import PlaceDetails from '../place/PlaceDetails'
import Navbar from '../layout/Navbar'
import CreatePlace from '../place/CreatePlace'
import PrivateRoute from './PrivateRoute'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'



function Routes() {

    return (
        <Router>
            <Navbar />
            <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/signup" component={Register} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <Route exact path="/places" component={Places} />
                <PrivateRoute
                    exact
                    path="/create-place"
                    component={CreatePlace}
                />
                <Route exact path="/place/:placeId" component={PlaceDetails} />
            </Switch>
        </Router>
    )
}

export default Routes
