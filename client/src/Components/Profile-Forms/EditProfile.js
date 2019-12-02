import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, withRouter, Redirect } from 'react-router-dom';
import { createProfile, getCurrentProfile } from '../../Redux/Actions/Profile';

const EditProfile = props => {

    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile.profile);
    const loading = useSelector(state => state.profile.loading);

    const [displaySocialInputs, toggleDisplaySocialInputs] = useState(false);
    const [formData, setFormData] = useState({
        location: '',
        bio: '',
        website: '',
        status: '',
        instruments: '',
        youtube: '',
        twitter: '',
        facebook: '',
        instagram: '',
        spotify: ''
    })

    const { location, bio, website, status, instruments, youtube, twitter, facebook, instagram, spotify } = formData

    useEffect(() => {
        dispatch(getCurrentProfile())

        setFormData({
            location: loading || !profile.location ? '' : profile.location,
            bio: loading || !profile.bio ? '' : profile.bio,
            website: loading || !profile.website || profile.website === 'https://' ? '' : profile.website,
            status: loading || !profile.status ? '' : profile.status,
            instruments: loading || !profile.instruments ? '' : profile.instruments.join(','),
            youtube: loading || !profile.social || profile.social.youtube === 'https://' ? '' : profile.social.youtube,
            twitter: loading || !profile.social || profile.social.twitter === 'https://' ? '' : profile.social.twitter,
            facebook: loading || !profile.social || profile.social.facebook === 'https://' ? '' : profile.social.facebook,
            instagram: loading || !profile.social || profile.social.instagram === 'https://' ? '' : profile.social.instagram,
            spotify: loading || !profile.social || profile.social.spotify === 'https://' ? '' : profile.social.spotify,
        })

    }, [dispatch])

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault();

        if (profile.website !== undefined && formData.website.slice(0, 5) !== 'https') {
            const beginningURL = 'https://'
            formData.website = beginningURL + formData.website.trim();
        }
        if (profile.social.facebook !== undefined && formData.facebook.slice(0, 5) !== 'https') {
            const beginningURL = 'https://'
            formData.facebook = beginningURL + formData.facebook.trim();
        }
        if (profile.social.twitter !== undefined && formData.twitter.slice(0, 5) !== 'https') {
            const beginningURL = 'https://'
            formData.twitter = beginningURL + formData.twitter.trim();
        }
        if (profile.social.instagram !== undefined && formData.instagram.slice(0, 5) !== 'https') {
            const beginningURL = 'https://'
            formData.instagram = beginningURL + formData.instagram.trim();
        }
        if (profile.social.spotify !== undefined && formData.spotify.slice(0, 5) !== 'https') {
            const beginningURL = 'https://'
            formData.spotify = beginningURL + formData.spotify.trim();
        }
        if (profile.social.youtube !== undefined && formData.youtube.slice(0, 5) !== 'https') {
            const beginningURL = 'https://'
            formData.youtube = beginningURL + formData.youtube.trim();
        }

        dispatch(createProfile(formData, props.history, true))

        props.history.push('/dashboard')
    }

    return (
        <Fragment>
            <h1 className='large text-primary'>
                Create Your Profile
            </h1>
            <p className='lead'>
                <i className='fas fa-user'></i> Let's get some information to make your profile stand out
            </p>
            <small>* = required field</small>
            <form className='form' onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <select name='status' value={status} onChange={e => onChange(e)}>
                        <option value='0'>* Select Professional Status</option>
                        <option value='Performance and/or Writing Musician'>Performance and/or Writing Musician</option>
                        <option value='Music Producer'>Music Producer</option>
                        <option value='Production Music Writer'>Production Music Writer</option>
                        <option value='Booking Agent'>Booking Agent</option>
                        <option value='Concert Promoter'>Concert Promoter</option>
                        <option value='Music Publisher'>Music Publisher</option>
                        <option value='Instructor'>Music Teacher</option>
                        <option value='Sound Technician'>Sound Technician</option>
                        <option value='Music Photographer'>Music Photographer</option>
                        <option value='Other'>Other</option>
                    </select>
                    <small className='form-text'>
                        Give us an idea of what you do in the music industry
                    </small>
                </div>
                <div className='form-group'>
                    <input type='text' placeholder='Website' name='website' value={website} onChange={e => onChange(e)} />
                    <small className='form-text'>
                        Could be your own or a musical group website
                    </small>
                </div>
                <div className='form-group'>
                    <input type='text' placeholder='Location' name='location' value={location} onChange={e => onChange(e)} />
                    <small className='form-text'>
                        City and state suggested (eg. Los Angeles, CA)
                    </small>
                </div>
                <div className='form-group'>
                    <input type='text' placeholder='* Instruments' name='instruments' value={instruments} onChange={e => onChange(e)} />
                    <small className='form-text'>
                        Please use comma separated values (eg.Piano, Guitar, Saxophone, Violin)
                    </small>
                </div>
                <div className='form-group'>
                    <textarea placeholder='A short bio of yourself and your relationship with music' name='bio' value={bio} onChange={e => onChange(e)}></textarea>
                    <small className='form-text'>Tell us a little about yourself</small>
                </div>

                <div className='my-2'>
                    <button type='button' onClick={() => toggleDisplaySocialInputs(!displaySocialInputs)} className='btn btn-light'>
                        Add Social Network Links
                    </button>
                    <span>Optional</span>
                </div>

                {displaySocialInputs && <Fragment>
                    <div className='form-group social-input'>
                        <i className="fab fa-spotify fa-2x"></i>
                        <input type='text' placeholder='Spotify URL' name='spotify' value={spotify} onChange={e => onChange(e)} />
                    </div>

                    <div className='form-group social-input'>
                        <i className='fab fa-instagram fa-2x'></i>
                        <input type='text' placeholder='Instagram URL' name='instagram' value={instagram} onChange={e => onChange(e)} />
                    </div>

                    <div className='form-group social-input'>
                        <i className='fab fa-twitter fa-2x'></i>
                        <input type='text' placeholder='Twitter URL' name='twitter' value={twitter} onChange={e => onChange(e)} />
                    </div>

                    <div className='form-group social-input'>
                        <i className='fab fa-facebook fa-2x'></i>
                        <input type='text' placeholder='Facebook URL' name='facebook' value={facebook} onChange={e => onChange(e)} />
                    </div>

                    <div className='form-group social-input'>
                        <i className='fab fa-youtube fa-2x'></i>
                        <input type='text' placeholder='YouTube URL' name='youtube' value={youtube} onChange={e => onChange(e)} />
                    </div>
                </Fragment>}
                <input type='submit' className='btn btn-primary my-1' />
                <Link to='/dashboard' className='btn btn-light my-1' >Go Back</Link>
            </form>
        </Fragment>
    );
}

export default withRouter(EditProfile);