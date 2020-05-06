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

    // if (props.isAuthenticated) {
    //     routes = (
    //         <Switch>
    //             {/* <Route path="/logout" component={Logout} /> */}
    //             <Route path="/auth" render={props => <Auth {...props} />} />
    //             <Route path="/" exact render={props => <HomeLayout {...props} isAuthenticated="true"/>} />
    //             <Route path="/indicator_messages/:id" render={props => <IndicatorMessageDetails {...props} />} />
    //             <Redirect to="/" />
    //         </Switch>
    //     );
    // }

    return (
        <BrowserRouter>
            {/* <Switch>
                <Route exact path="/" component={Auth} />
                <Route path="/Login" component={Auth} />
            </Switch> */}
            {routes}
        </BrowserRouter>
    )

}

export default MainRouter;