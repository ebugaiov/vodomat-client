import React from 'react';

const RenderCollectionItem = (collection, index) => {

    const { avtomatNumber, city, street, house } = collection;
    const { carNumber } = collection;
    const { time, money, moneyApp, price } = collection;

    const addressDiv = (
        <div className="d-flex justify-content-between">
            <span className="mr-2">{ index + 1 }.</span>
            <span className="mr-3">
                {street}, {house} <small>{city ? `(${city})` : ''}</small>
            </span>
            <span className='text-info'>{ avtomatNumber }</span>
        </div>
    )

    const routeDiv = (
        <div>
            <span><i className="fas fa-car"></i>&nbsp;{ carNumber }</span>
        </div>
    )

    const paramDiv = (
        <div className="d-flex justify-content-between">
            <span>
                <i className="fas fa-hourglass"></i>&nbsp;{ time.slice(2) }
            </span>
            <span><i className="fas fa-coins text-warning"></i>&nbsp;
                { money }&nbsp;<small>({price})</small>
            </span>
            <span><i className="fas fa-credit-card"></i>&nbsp;
                { moneyApp }
            </span>
        </div>
    )

    return (
        <div className='row'>
            <div className="col-md-4">{ addressDiv }</div>
            <div className="col-md-3">{ routeDiv }</div>
            <div className="col-md-5">{ paramDiv }</div>
        </div>
    )
}

export default RenderCollectionItem;
