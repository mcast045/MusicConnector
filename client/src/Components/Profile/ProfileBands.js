import React, { Fragment } from 'react';
import Moment from 'react-moment';

const ProfileBands = ({ band: { name, to, from, genres, description } }) => {

    return (
        <Fragment>
            <h3 className='text-dark'>{name}</h3>
            <p>
                <Moment format='YYYY/MM/DD'>{from}</Moment> - {!to ? ' Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
            </p>
            <p>
                <strong>Genres: </strong>{genres.map(genre => genre[0].toUpperCase() + genre.slice(1).toLowerCase() + ' ')}
            </p>
            <p>
                <strong>Description: </strong>{description}
            </p>
            <hr size='2' />
        </Fragment >

    );
}

export default ProfileBands;