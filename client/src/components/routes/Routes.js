import React from 'react'
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
import BoardList from '../boards/BoardList'
import BoardDetails from '../boards/BoardDetails'
import CreateBoard from '../boards/CreateBoard'
import Alert from '../layout/Alert'
import SendEmail from '../forgetPassword/SendEmail'
import ResetPassword from '../forgetPassword/ResetPassword'
import Users from '../users/Users'
function Routes() {
    return (
        <Router>
            <Navbar />
            <Alert />
            <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/signup" component={Register} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute
                    exact
                    path="/createboard"
                    component={CreateBoard}
                />
                <PrivateRoute
                    exact
                    path="/create-place"
                    component={CreatePlace}
                />
                <Route exact path="/places" component={Places} />
                <Route exact path="/users" component={Users} />

                <Route exact path="/place/:placeId" component={PlaceDetails} />
                <Route exact path="/boards" component={BoardList} />
                <Route
                    exact
                    path={`/boards/:boardId`}
                    component={BoardDetails}
                />
                <Route exact path="/forgetpassword" component={SendEmail} />
                <Route
                    exact
                    path="/resetpassword/:token"
                    component={ResetPassword}
                />
            </Switch>
        </Router>
    )
}

export default Routes
