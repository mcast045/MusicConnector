import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import Alert from '../Layout/Alert';
import Dashboard from '../Dashboard/Dashboard';
import PrivateRoute from '../Routing/PrivateRoute';
import CreateProfile from '../Profile-Forms/CreateProfile';
import EditProfile from '../Profile-Forms/EditProfile';
import AddBands from '../Profile-Forms/AddBands';
import Profiles from '../Profiles/Profiles';
import Profile from '../Profile/Profile';
import Posts from '../Posts/Posts';
import Post from '../Post/Post';
import NotFound from '../Layout/NotFound';


const Routes = () => {
    return (
        <section className='container'>
            <Alert />
            <Switch>
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
                <Route path='/profiles' component={Profiles} />
                <Route path='/profile/:id' component={Profile} />
                <PrivateRoute path='/dashboard' component={Dashboard} />
                <PrivateRoute path='/create-profile' component={CreateProfile} />
                <PrivateRoute path='/edit-profile' component={EditProfile} />
                <PrivateRoute path='/add-bands' component={AddBands} />
                <PrivateRoute path='/posts' component={Posts} />
                <PrivateRoute path='/post/:id' component={Post} />
                <Route component={NotFound} />
            </Switch>
        </section>
    );
}

export default Routes;


