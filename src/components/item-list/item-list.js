import React, { useState } from 'react';

import './item-list.css';

import Spinner from '../spinner';

const ItemList = ({ listHeader, items, loading, renderItem, onAutoupdateChange, onItemSelected }) => {

    const [autoupdate, setAutoupdate] = useState(true)

    const autoupdateSwitchChange = ({ target: {checked} }) => {
        setAutoupdate(checked)
        onAutoupdateChange(checked)
    }

    const elements = items.map((item) => {
        
        const { id } = item;
        const label = renderItem(item)

        return (
            <li key={id}
                className="list-group-item list-group-item-action"
                onClick={() => onItemSelected(id)}>
                { label }
            </li>
        );
    })

    const spinner = loading ? <Spinner /> : null;

    return (

        <div className="item-list card">
            <div className="card-header d-flex justify-content-between">
                { listHeader }
                { spinner }
                { onAutoupdateChange ? 
                    (<div className="custom-control custom-switch">
                        <input type="checkbox"
                            className="custom-control-input"
                            id="autoupdateSwitch"
                            checked={autoupdate}
                            onChange={autoupdateSwitchChange}
                        />
                        <label className="custom-control-label" htmlFor="autoupdateSwitch"><small>Autoupdate</small></label>
                    </div>)
                 : <div></div> }
            </div>
            <ul className="list-group">
                { elements }
            </ul>
        </div>
    );
}

export default ItemList;