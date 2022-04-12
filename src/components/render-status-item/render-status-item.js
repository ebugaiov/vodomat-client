import React from 'react';

import './render-status-item.css';

const RenderStatusItem = (status, index) => {

    const { avtomatNumber, street, house, size } = status;
    const { carNumber, routeName } = status;
    const { lowWaterBalance } = status;
    const { errorVolt, errorBill, errorCounter, errorRegister, cashBox } = status;
    const { time, water, money, price, avtomatState } = status;
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

    let avtomatStateEl = null;
    switch (avtomatState) {
        case 0:
            avtomatStateEl = <i className='fas fa-question'></i>;
            break;
        case 1:
            avtomatStateEl = <i className='fas fa-check text-success'></i>;
            break;
        case 2:
            avtomatStateEl = <i className='fas fa-bolt text-warning'></i>;
            break;
        case 3:
            avtomatStateEl = <i className='fas fa-trash text-danger'></i>;
            break;
        default:
            break;
    }

    const addressDiv = (
        <div>
            { avtomatStateEl }
            <span className="ml-2 mr-2">{index + 1}.</span>
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
            { renderError(errorVolt, 'Volt') }&nbsp;
            { renderError(errorBill, 'Bill') }&nbsp;
            { renderError(errorCounter, 'Counter') }&nbsp;
            { renderError(errorRegister, 'Register') }&nbsp;
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
            <div className='col-md-4 d-flex justify-content-between pl-0'>
                <div className="">{ addressDiv }</div>
                <div className="">{ routeDiv }</div>
            </div>
            <div className="col-md-3 pr-0">{ errorDiv }</div>
            <div className="col-md-5 p-0">{ paramDiv }</div>
        </div>
    )
}

export default RenderStatusItem;