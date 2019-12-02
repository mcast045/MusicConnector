import React from 'react';
import { Link } from 'react-router-dom';

const ProfileItem = ({
    profile: {
        user: { _id, name, avatar },
        status,
        location,
        instruments,
        bands
    }
}) => {

    const currentBandIndex = bands.findIndex(band => band.current === true)

    let count = 0;
    for (let i = 0; i < bands.length; i++) {
        if (bands[i].current === true) {
            count++
        }
    }

    return (
        <div className='profile bg-light'>
            <img className='round-img' src={avatar} alt='' />
            <div>
                <h2>{name}</h2>
                <p>{status}</p>
                <p>{count > 0 ? 'Current: ' + bands[currentBandIndex].name : ' '}</p>
                <p className='my-1'>{location && <span>{location}</span>}</p>
                <Link to={`/profile/${_id}`} className='btn btn-primary'>View Profile</Link>
            </div>
            <ul>
                {instruments.slice(0, 4).map((instrument, index) => (
                    <li key={index} className='text-primary'>
                        <i className='fas fa-check' /> {instrument}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProfileItem;