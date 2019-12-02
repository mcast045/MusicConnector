import React, { useEffect, Fragment } from 'react';
import { getProfileById } from '../../Redux/Actions/Profile';
import Spinner from '../Layout/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileBand from './ProfileBands';

const Profile = props => {

    const dispatch = useDispatch()
    const profile = useSelector(state => state.profile)
    const auth = useSelector(state => state.auth)
    const userProfile = useSelector(state => state.profile.profile)

    useEffect(() => {
        dispatch(getProfileById(props.match.params.id));
    }, [dispatch, props.match.params.id])

    return (
        <Fragment>
            {profile.profile === null || profile.loading ? <Spinner /> :
                <Fragment>
                    <Link to='/profiles' className='btn btn-light'>Back To Profiles</Link>
                    {auth.isAuthenticated &&
                        auth.loading === false &&
                        auth.user._id === props.match.params.id &&
                        (<Link to='/edit-profile' className='btn btn-dark'>Edit Profile</Link>)}

                    <div className="profile-grid my-1">
                        <ProfileTop profile={userProfile} />
                        <ProfileAbout profile={userProfile} />
                        <div className='profile-exp bg-white p-2'>
                            <h2 className="text-primary">Bands</h2>
                            {userProfile.bands.length > 0 ? (
                                <Fragment>
                                    {userProfile.bands.map(band => (
                                        <ProfileBand key={band._id} band={band} />
                                    ))}
                                </Fragment>) : <h4>No bands listed</h4>}
                        </div>
                    </div>
                </Fragment>}
        </Fragment>
    );
}

export default Profile;