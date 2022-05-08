import React from 'react';

import './render-status-item.css';

const RenderStatusItem = (status, index) => {

    const adminSiteDomain = process.env.REACT_APP_ADMIN_DOMAIN;

    const { avtomatNumber, street, house, size } = status;
    const { latitude, longitude } = status;
    const { carNumber, routeName } = status;
    const { lowWaterBalance } = status;
    const { errorVolt, errorBill, errorCounter, errorRegister, cashBox } = status;
    const { time, water, money, price, avtomatState } = status;
    const { grn, kop, moneyApp } = status;
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
            <a className='text-info mr-3'
                target='_blank' rel='noopener noreferrer'
                href={`/statistic_lines/${avtomatNumber}`}
            >
                { avtomatNumber }
            </a>
            <a className='text-info mr-3'
                target='_blank' rel='noopener noreferrer'
                href={`${adminSiteDomain}/admin_panel/avtomat/${avtomatNumber}`}
            >
                <i className="fas fa-edit"></i>
            </a>
            { (latitude && longitude) ? (
                    <a className='text-info'
                        target='_blank' rel='noopener noreferrer'
                        href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}
                    >
                    <i className="fas fa-map-marker-alt"></i>
                    </a>
                ) : null
            }

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
            { renderError(lowWaterBalance, 'Low W') }&nbsp;
            { renderError(errorVolt, 'Volt') }&nbsp;
            { renderError(errorBill, 'Bill') }&nbsp;
            { renderError(errorCounter, 'Co-r') }&nbsp;
            { renderError(errorRegister, 'Reg') }&nbsp;
            { renderError(cashBox, 'Cash B') }
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
                <span><i className="fas fa-money-bill"></i>&nbsp;{grn}</span>
                &nbsp;&nbsp;
                <span><i className="fas fa-coins"></i>&nbsp;{kop * 50 / 100}</span>
            </span>
            <span>
                <span>
                    Bill <i className={notWorkClassName(billNotWork)}></i> {billNotWork || '--'}
                    &nbsp;&nbsp;
                </span>
                <span>
                    Coin <i className={notWorkClassName(coinNotWork)}></i> {coinNotWork || '--'}
                    &nbsp;&nbsp;
                </span>
                <span>
                    Reg <i className={notWorkClassName(timeToBlock)}></i> {timeToBlock || '--'}
                </span>
            </span>
        </div>
    )

    return (
        <div className='row'>
            <div className='col-md-4 d-flex justify-content-between pl-0'>
                <div className="">{ addressDiv }</div>
                <div className="">{ routeDiv }</div>
            </div>
            <div className="col-md-2 pr-0">{ errorDiv }</div>
            <div className="col-md-6 p-0">{ paramDiv }</div>
        </div>
    )
}

export default RenderStatusItem;
