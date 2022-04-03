import React from 'react';

import './render-status-item.css';

const RenderStatusItem = (status, index) => {

    const { avtomatNumber, street, house, size } = status;
    const { carNumber } = status;
    const { lowWaterBalance } = status;
    const { errorVolt, errorBill, errorCounter, errorRegister } = status;
    const { time, water, money, price } = status;
    const { billNotWork, coinNotWork } = status;

    const renderError = (status, errorName) => {
        if (status) {
            return <span className='badge badge-danger'>{errorName}</span>
        } else {
            return <span className='badge badge-success'>{errorName}</span>
        }
    }

    const now = new Date();
    const isOld = new Date(time).getTime() < now.setHours(now.getHours() - 2);
    const timeClassName = isOld ? 'text-danger' : null;

    const addressDiv = (
        <div>
            <span className="mr-2">{index + 1}.</span>
            <span className='mr-3'>
                { street }, { house }
            </span>
            <a className='text-info'
                target='_blank' rel='noopener noreferrer'
                href={`/statistic_lines/${avtomatNumber}`}
            >
                { avtomatNumber }
            </a>
        </div>
    )

    const routeDiv = (
        <div>
            <span><i className="fas fa-car"></i>&nbsp;{ carNumber }</span>
        </div>
    )

    const errorDiv = (
        <div>
            { renderError(lowWaterBalance, 'Low Water') }&nbsp;
            { renderError(errorVolt, 'Error Volt') }&nbsp;
            { renderError(errorBill, 'Error Bill') }&nbsp;
            { renderError(errorCounter, 'Error Counter') }&nbsp;
            { renderError(errorRegister, 'Error Register') }
        </div>
    )

    const paramDiv = (
        <div className='d-flex justify-content-between'>
            <span className={timeClassName}>
                <i className="fas fa-hourglass"></i>&nbsp;{ time.slice(5) }
            </span>
            <span><i className="fas fa-water text-info"></i>&nbsp;
                { water }&nbsp;<small>({size})</small>
            </span>
            <span><i className="fas fa-coins text-warning"></i>&nbsp;
                { money }&nbsp;<small>({price})</small>
            </span>
            <span>Bill <i className="fas fa-ban text-danger"></i>: {billNotWork}</span>
            <span>Coin <i className="fas fa-ban text-danger"></i>: {coinNotWork}</span>
        </div>
    )

    return (
        <div className='row'>
            <div className="col-md-3 p-0">{ addressDiv }</div>
            <div className="col-md-1 p-0">{ routeDiv }</div>
            <div className="col-md-4 p-0">{ errorDiv }</div>
            <div className="col-md-4 pl-0">{ paramDiv }</div>
        </div>
    )
}

export default RenderStatusItem;