import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBands } from '../../Redux/Actions/Profile';
import { Link, withRouter } from 'react-router-dom';

const AddBands = props => {

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: '',
        from: '',
        to: '',
        current: false,
        genres: '',
        description: '',
    })
    const [toDateDisabled, toggleDisabled] = useState(false)

    const { name, from, to, current, genres, description } = formData

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault()
        dispatch(addBands(formData, props.history))
    }

    return (
        <Fragment>
            <h1 className="large text-primary">
                Add Your Band(s)
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch" /> Add any music group or bands that you have been in
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="* Job Title/Band Name" name="name" value={name} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Genre" name="genres" value={genres} onChange={e => onChange(e)} />
                    <small className='form-text'>
                        Please use comma separated values (eg. Jazz, Blues, Rock, Funk)
                    </small>
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" value={from} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <p>
                        <input type="checkbox" name="current" checked={current} value={current}
                            onChange={() => { setFormData({ ...formData, current: !current }); toggleDisabled(!toDateDisabled) }} />
                        {' '}Current Band
                    </p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date" name="to" value={to} onChange={e => onChange(e)} disabled={toDateDisabled ? 'disabled' : ''} />
                </div>
                <div className="form-group">
                    <textarea name="description" cols="30" rows="5" placeholder="Band Description" value={description} onChange={e => onChange(e)} />
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    );
}

export default withRouter(AddBands);