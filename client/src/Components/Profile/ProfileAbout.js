import React, { Fragment } from 'react';

const ProfileAbout = ({
    profile: {
        user: { name },
        bio,
        instruments
    }
}) => {
    return (
        <div className="profile-about bg-light p-2">
            {bio &&
                <Fragment>
                    <h2 className="text-primary">{name.trim().split(' ')[0]}'s Bio</h2>
                    <p>
                        {bio}
                    </p>
                </Fragment>
            }
            <div className="line"></div>
            <h2 className="text-primary">Instruments Played</h2>
            <div className="skills">
                {instruments.map((instrument, i) =>
                    <div className='p-1' key={i}>
                        <i className='fas fa-check' /> {instrument}
                    </div>
                )}
            </div>
        </div>

    );
}

export default ProfileAbout;