import React from 'react';

const RenderStatisticLine = (statisticLine, index) => {

    const { time } = statisticLine;
    const { lowWaterBalance, errorVolt, errorBill, errorCounter, errorRegister } = statisticLine;
    const { water, money, moneyApp, price, grn, kop } = statisticLine;
    const { cashBox, gsm, event } = statisticLine;
    const { billNotWork, coinNotWork, timeToBlock } = statisticLine;
    const { isModified } = statisticLine;

    const renderError = (status, errorName) => {
        if (status) {
            return <span className='badge badge-danger'>{errorName}</span>
        } else {
            return <span className='badge badge-success'>{errorName}</span>
        }
    }

    let eventBadge

    switch(event) {
        case 3:
            eventBadge = <span className="badge badge-warning">Collection</span>;
            break;
        case 6:
            eventBadge = <span className="badge badge-secondary">Send Data</span>;
            break;
        default:
            eventBadge = <span className="badge badge-danger">{event}</span>;
    }

    const timeDiv = (
        <div>
            <span className='mr-2'>{ index + 1 }.</span>
            <span className='text-info'>{ time.slice(2) }</span>
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
        <div className="d-flex justify-content-between">
            <span>
                {
                    isModified ?
                    <i className="fas fa-shopping-cart text-primary"></i>
                    : <i className="fas fa-water text-info"></i>
                }
                &nbsp;{ water }
            </span>
            <span>
                <span>
                    <i className="fas fa-coins text-warning"></i>&nbsp;{ money }
                </span>
                &nbsp;&nbsp;
                {
                    moneyApp ? 
                    <span><i className="fas fa-credit-card"></i>&nbsp;{moneyApp}</span>
                    : null
                }
                &nbsp;<small>({price})</small>
            </span>
            <span>
                <span><i className="fas fa-money-bill"></i>&nbsp;{grn}</span>
                &nbsp;&nbsp;
                <span><i className="fas fa-coins"></i>&nbsp;{kop}</span>
            </span>
            <span>Bill <i className="fas fa-ban text-danger"></i>: {billNotWork}</span>
            <span>Coin <i className="fas fa-ban text-danger"></i>: {coinNotWork}</span>
            <span><i className="fas fa-wifi">&nbsp;{gsm}</i></span>
            <span>{ eventBadge }</span>
        </div>
    )

    return (
        <div className='row'>
            <div className="col-md-2">{ timeDiv }</div>
            <div className="col-md-4">{ errorDiv }</div>
            <div className="col-md-6">{ paramDiv }</div>
        </div>
    )
}

export default RenderStatisticLine;