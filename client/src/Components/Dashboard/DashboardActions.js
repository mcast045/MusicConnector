import React from 'react';
import { Link } from 'react-router-dom';


const DashBoardActions = () => {
    return (
        <div className="dash-buttons">
            <Link to="edit-profile" className="btn btn-light">
                <i className="far fa-user text-primary"></i> Edit Profile
            </Link>
            <Link to="add-bands" className="btn btn-light">
                <i className="fas fa-guitar text-primary"></i> Add Bands
            </Link>
        </div>

    );
}

export default DashBoardActions;