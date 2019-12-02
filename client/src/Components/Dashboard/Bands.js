import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import Moment from 'react-moment';
import { deleteBand } from '../../Redux/Actions/Profile';

const Bands = ({ bands }) => {

    const dispatch = useDispatch();

    const musicGroups = bands.map(band => (
        <tr key={band._id}>
            <td>{band.name}</td>
            <td className='hide-sm'><Moment format='YYYY/MM/DD'>{band.from}</Moment> -{' '} {band.to === '' ? (' Now') : (<Moment format='YYYY/MM/DD'>{band.to}</Moment>)}</td>
            <td className='hide-sm'>{band.genres.map((genre, i) => <span key={i}>{genre + ' '}</span>)}</td>
            <td>
                <button className='btn btn-danger' onClick={() => dispatch(deleteBand(band._id))}>Delete</button>
            </td>
        </tr>
    ));

    // {...console.log(band.name + ': ' + band._id)}

    return (
        <Fragment>
            <h2 className='my-2'>Musician Credentials</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Band</th>
                        <th className='hide-sm'>Years</th>
                        <th className='hide-sm'>Genre</th>
                        <th />
                    </tr>
                </thead>
                <tbody>{musicGroups}</tbody>
            </table>
        </Fragment>
    )
}

export default Bands;