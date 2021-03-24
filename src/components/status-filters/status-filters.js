import React from 'react';

import './status-filters.css';

const StatusFilters = () => {
    return (
        <div className="status-filters navbar navbar-dark">
            <span className="filter-header navbar-brand">Manage <b>Status</b></span>

            <form className="form-inline">
                <input className="form-control-sm" type="text" id="address" placeholder="Input Address or Number" />
                <input className="form-control-sm" type="text" id="route" placeholder="Input Route" />
                
                <label className="error-button btn btn-dark btn-sm">
                    <input type="checkbox" id="waterError"/> Low Water
                </label>
                <label className="error-button btn btn-dark btn-sm">
                    <input type="checkbox" id="billError"/> Bill
                </label>
                <label className="error-button btn btn-dark btn-sm">
                    <input type="checkbox" id="voltError"/> Volt
                </label>
                <label className="error-button btn btn-dark btn-sm">
                    <input type="checkbox" id="registerError"/> Register
                </label>
                <button className="reset-filters-btn btn btn-dark btn-sm">Clear All</button>
            </form>
        </div>
    )
}

export default StatusFilters;