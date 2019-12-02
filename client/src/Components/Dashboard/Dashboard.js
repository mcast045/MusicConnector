import React, { useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../Redux/Actions/Profile';
import Spinner from '../Layout/Spinner';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import Bands from './Bands';

const Dashboard = () => {

    const dispatch = useDispatch()
    const profile = useSelector(state => state.profile.profile)
    const loading = useSelector(state => state.profile.loading)
    const user = useSelector(state => state.auth.user)

    useEffect(() => {
        dispatch(getCurrentProfile())
    }, [dispatch])

    return (
        <div>
            {loading && profile === null ? <Spinner /> :
                <Fragment>
                    <h1 className='large text-primary'>
                        Dashboard
                    </h1>
                    <p className='lead'><i className='far fa-user-circle' /> Welcome {user && user.name}</p>
                    {profile !== null ? (
                        <Fragment>
                            <DashboardActions />
                            <Bands bands={profile.bands} />
                            <div className='my-2'>
                                <button className='btn btn-danger' onClick={() => dispatch(deleteAccount())}><i className='fas fa-user-slash' /> Delete My Account</button>
                            </div>
                        </Fragment>
                    ) : (
                            <Fragment>
                                <p>You have not yet set up a profile, please add your information</p>
                                <Link to='/create-profile' className='btn btn-primary my-1'>Create Profile</Link>
                            </Fragment>)}
                </Fragment>}
        </div>
    );
}

export default Dashboard;