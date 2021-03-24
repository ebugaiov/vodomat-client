import React from 'react';

import './item-detail.css';

const ItemDetail = () => {
    return (
        <div className="item-detail">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Mira st, 78 <span className="small">(Kharkov)</span></h5>
                    <p className="card-text text-muted"><i class="card-icon fas fa-shopping-cart"></i>5</p>
                    <p className="card-text text-muted"><i class="card-icon fas fa-road"></i>45-25</p>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Water: 470</li>
                    <li className="list-group-item">Money: 920.15</li>
                    <li className="list-group-item">Price: 132</li>
                    <li className="list-group-item">Error: No</li>
                </ul>
            </div>
        </div>
    )
}

export default ItemDetail;