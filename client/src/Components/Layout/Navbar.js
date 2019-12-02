import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../Redux/Actions/Auth';


const Navbar = props => {

    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const loading = useSelector(state => state.auth.loading)

    const authLinks = (
        <ul>
            <li><Link to="/profiles">Musicians</Link></li>
            <li><Link to="/posts">Posts</Link></li>
            <li><Link to="/dashboard"><i className="far fa-user-circle" />{' '}<span className='hide-sm'>Dashboard</span></Link></li>
            <li><Link to="#!" onClick={() => dispatch(logout(props.history))}><i className='fas fa-sign-out-alt' />{' '}<span className='hide-sm'>Logout</span></Link></li>
        </ul>
    )

    const guestLinks = (
        <ul>
            <li><Link to="/profiles">Musicians</Link></li>
            <li><Link to="/register">Sign Up</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    )

    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="fas fa-music" /> Music Connector</Link>
            </h1>
            {!loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>)}
        </nav>

    );
}

export default withRouter(Navbar);