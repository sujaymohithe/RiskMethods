import React from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import HomeLayout from './containers/HomeContainer.js/HomeLayout';
import IndicatorMessageDetails from './components/IndicatorMessages/IndicatorMessageDetails/IndicatorMessageDetails';
import Logout from './containers/Auth/Logout/Logout';

const MainRouter = props => {
    let isAuthenticated = props.isAuthenticated;
    let routes = (
        <Switch>
            <Route path="/auth" render={props => <Auth {...props} />} />
            <Route path="/logout" component={Logout} />
            <Route exact path="/" render={props => <HomeLayout {...props} isAuthenticated={isAuthenticated} />} />
            <Route path="/indicator_messages/:id" render={props => <IndicatorMessageDetails {...props} isAuthenticated={isAuthenticated}/>} />
            <Redirect to="/" />
        </Switch>
    );

    return (
        <BrowserRouter>
            {routes}
        </BrowserRouter>
    )

}

export default MainRouter;