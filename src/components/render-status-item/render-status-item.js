import React from 'react';

import './render-status-item.css';

const RenderStatusItem = (status, index) => {

    const { avtomatNumber, street, house, size } = status;
    const { carNumber, routeName } = status;
    const { lowWaterBalance } = status;
    const { errorVolt, errorBill, errorCounter, errorRegister, cashBox } = status;
    const { time, water, money, price } = status;
    const { billNotWork, coinNotWork, timeToBlock } = status;

    const renderError = (status, errorName) => {
        if (status) {
            return <span className='badge badge-danger'>{errorName}</span>
        } else {
            return <span className='badge badge-success'>{errorName}</span>
        }
    }

    const notWorkClassName = (value) => {
        return value > 12 ? 'fas fa-ban text-danger' : 'fas fa-ban';
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
            <span>
                <i className="fas fa-car"></i>&nbsp;
                { routeName }&nbsp;<small>({ carNumber })</small>
            </span>
        </div>
    )

    const errorDiv = (
        <div>
            { renderError(lowWaterBalance, 'Low Water') }&nbsp;
            { renderError(errorVolt, 'Error Volt') }&nbsp;
            { renderError(errorBill, 'Error Bill') }&nbsp;
            { renderError(errorCounter, 'Error Counter') }&nbsp;
            { renderError(errorRegister, 'Error Register') }&nbsp;
            { renderError(cashBox, 'Cash Box') }
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
            <span>
                Bill <i className={notWorkClassName(billNotWork)}></i>: {billNotWork}
            </span>
            <span>
                Coin <i className={notWorkClassName(coinNotWork)}></i>: {coinNotWork}
            </span>
            <span>
                Reg <i className={notWorkClassName(timeToBlock)}></i>: {timeToBlock}
            </span>
        </div>
    )

    return (
        <div className='row'>
            <div className='col-md-3 d-flex justify-content-between'>
                <div className="">{ addressDiv }</div>
                <div className="">{ routeDiv }</div>
            </div>
            <div className="col-md-4 pr-0">{ errorDiv }</div>
            <div className="col-md-5 p-0">{ paramDiv }</div>
        </div>
    )
}

export default RenderStatusItem;