import React from 'react';

import './item-list.css';

const ItemList = ({ items, renderItem, onItemSelected }) => {

    const elements = items.map((item) => {

        const { avtomatNumber } = item;
        const label = renderItem(item)

        return (
            <li key={avtomatNumber}
                className="list-group-item list-group-item-action"
                onClick={() => onItemSelected(avtomatNumber)}>
                { label }
            </li>
        );
    })

    return (
        <ul className="list-group item-list">
            { elements }
        </ul>
    );
}

export default ItemList;