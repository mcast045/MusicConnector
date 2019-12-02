import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../Layout/Spinner';
import ProfileItem from './ProfileItem';
import { getAllProfiles } from '../../Redux/Actions/Profile';

const Profiles = () => {

    const dispatch = useDispatch()
    const profiles = useSelector(state => state.profile.profiles)
    const loading = useSelector(state => state.profile.loading)

    useEffect(() => {
        dispatch(getAllProfiles());
    }, [dispatch])

    return (
        <Fragment>
            {loading ? <Spinner />
                :
                <Fragment>
                    <h1 className='large text-primary'>Musicians</h1>
                    <p className='lead'>
                        <i className='fab fa-connectdevelop'></i>Browse and connect with musicians</p>
                    <div className='profiles'>
                        {profiles.length > 0 ? (
                            profiles.map(profile => <ProfileItem key={profile._id} profile={profile} />)
                        ) : <h4>No profiles found</h4>}
                    </div>
                </Fragment>
            }
        </Fragment>
    );
}

export default Profiles;