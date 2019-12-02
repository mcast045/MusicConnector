import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const loading = useSelector(state => state.auth.loading)

    return (
        <div>
            <Route
                {...rest} render={props =>
                    !isAuthenticated && !loading ? (
                        <Redirect to='/login' />
                    ) : (
                            <Component {...props} />)} />
        </div>
    );
}

export default PrivateRoute;