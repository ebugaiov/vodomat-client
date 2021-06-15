import React, { useState } from 'react';

import './status-filters.css';

const StatusFilters = (props) => {

    const [avtomatAddress, setAvtomatAddress] = useState('')

    const onSearchByAddressChanged = (e) => {
        const avtomatAddress = e.target.value
        setAvtomatAddress(avtomatAddress)
        props.onSearchByAddressChanged(avtomatAddress)
    }

    return (
        <div className="status-filters navbar navbar-dark">
            <span className="filter-header navbar-brand">Manage <b>Status</b></span>

            <form className="form-inline">
                <input className="form-control-sm"
                       onChange={onSearchByAddressChanged}
                       value={avtomatAddress}
                       type="text" id="address" placeholder="Address or Number" />
                <input className="form-control-sm"
                       
                       type="text" id="route" placeholder="Route" />
                
                
                <label className="error-button btn btn-dark btn-sm">
                    <input type="checkbox" id="error"/> Error
                </label>
                
                <button className="reset-filters-btn btn btn-dark btn-sm">Clear All</button>
            </form>
        </div>
    )
}

export default StatusFilters;