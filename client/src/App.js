import React, { Fragment, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import store from './Redux/Store';
import Navbar from './Components/Layout/Navbar';
import Landing from './Components/Layout/Landing';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './Redux/Actions/Auth';
import Routes from './Components/Routing/Routes';


// Run setAuthToken on every load
if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Fragment>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route component={Routes} />
      </Switch>
    </Fragment>
  );
}

export default App;
