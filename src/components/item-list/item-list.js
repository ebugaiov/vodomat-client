import React, { useState } from 'react';

import './item-list.css';

import Spinner from '../spinner';

const ItemList = ({ listHeader, items, loading, renderItem, autoupdateStatus = true, onAutoupdateChange, onItemSelected }) => {

    const [autoupdate, setAutoupdate] = useState(autoupdateStatus);

    const autoupdateSwitchChange = ({ target: {checked} }) => {
        setAutoupdate(checked)
        onAutoupdateChange(checked)
    }

    const onItemClick = (event, id) => {
        onItemSelected(id)
        if (document.querySelector('.item-list ul li.selected-item') !== null ) {
            document.querySelector('.item-list ul li.selected-item').classList.remove('selected-item')
        }
        event.target.closest('li').classList.add('selected-item')
    }

    const elements = items.map((item, index) => {

        const { id } = item;
        const label = renderItem(item, index)

        return (
            <li key={id}
                className="list-group-item list-group-item-action"
                onClick={(event) => onItemClick(event, id)}>
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

ItemList.defaultProps = {
    onItemSelected: () => {}
}

export default ItemList;
