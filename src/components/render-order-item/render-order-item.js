import React from 'react';

import './render-order-item.css';

import ReturnButton from '../return-button';

const RenderOrderItem = (order) => {

    const { avtomatNumber, address, appStatus } = order;
    const { id, payGateMoney, payGateStatus, payGateTime } = order;
    const { appId } = order;
    const { serverTime, serverStatus, serverMoney } = order;

    const _payGateTime = new Date(payGateTime);
    const startPeriod = new Date(_payGateTime.getTime()
        + (- 15 - _payGateTime.getTimezoneOffset()) * 60000).toISOString();
    const endPeriod = new Date(_payGateTime.getTime()
        + (15 - _payGateTime.getTimezoneOffset()) * 60000).toISOString();

    const copyToClipboard = (str) => {
        const el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    };

    const divWithCopyToClipboard = (strToCopy, innerText) => {
        return (
            <div onMouseDown={(e) => {
                    e.target.className = "elemGrabbed";
                    copyToClipboard(strToCopy);
                }}
                onMouseUp={(e) => {
                    setTimeout(() => e.target.className = "elemForGrab", 500)
                }}
                className="elemForGrab"
                data-toggle="tooltip" title="Click Me to Copy"
            >
                { innerText }
            </div>
        )
    }

    let statusAppSpan = <span>{appStatus}</span>
    switch (appStatus) {
        case 0:
            statusAppSpan = <span className='badge badge-secondary'>App CREATED</span>;
            break;
        case 1:
            statusAppSpan = <span className='badge badge-primary'>App IN PROGRESS</span>;
            break;
        case 2:
            statusAppSpan = <span className='badge badge-success'>App DONE</span>
            break;
        case 3:
            statusAppSpan = <span className='badge badge-info'>App RETURN</span>
            break;
        case 4:
            statusAppSpan = <span className='badge'>App NOT PAYED</span>
            break;
        case 5:
            statusAppSpan = <span className="badge badge-danger">App NOT RETURN</span>
            break;
        default:
            break;
    }

    let statusPayGateSpan = <span>{payGateStatus}</span>;
    switch (payGateStatus) {
        case 'PAYED':
            statusPayGateSpan = <span className='badge badge-success'>PayGate {payGateStatus}</span>;
            break;
        case 'REJECTED':
            statusPayGateSpan = <span className='badge badge-info'>PayGate {payGateStatus}</span>;
            break;
        case 'RETURN':
            statusPayGateSpan = <span className='badge badge-danger'>PayGate {payGateStatus}</span>;
            break;
        case 'CREATED':
            statusPayGateSpan = <span className='badge badge-secondary'>PayGate {payGateStatus}</span>;
            break;
        default:
            break;
    }

    let statusServerSpan = <span>{serverStatus}</span>;
    switch (serverStatus) {
        case 0:
            statusServerSpan = <span className="badge badge-warning">Server WAIT</span>;
            break;
        case 1:
            statusServerSpan = <span className="badge badge-success">Server DONE</span>;
            break;
        case 2:
            statusServerSpan = <span className="badge badge-danger">Server FAIL</span>;
            break;
        default:
            break;
    }

    const leftDiv = (
        <div>
            <a className='text-info mr-3'
                target='_blank' rel='noopener noreferrer'
                href={`/statistic_lines/${avtomatNumber}?start_period=${startPeriod}&end_period=${endPeriod}`}
            >
                { avtomatNumber }
            </a>
            <span className="mr-3">{ address.split(' ').slice(2).join(' ') }</span>
            <span>{ order.error ? <ReturnButton itemsToReturn={[order, ]}/> : null }</span>
        </div>
    )

    const centerDiv = (
        <div>
            {statusAppSpan}&nbsp;
            {statusPayGateSpan}&nbsp;
            {statusServerSpan}
        </div>
    )

    const rightDiv = (
        <div className='d-flex justify-content-between'>
            <div>
                <span><i className="fas fa-hourglass"></i>&nbsp;{ payGateTime.split('T')[1] }</span>&nbsp;
                <small>{ serverTime ? `(${serverTime.split('T')[1]})` : null }</small>
            </div>
            <div>
                <span><i className="fas fa-coins"></i>&nbsp;{payGateMoney}</span>&nbsp;
                <small>{ serverMoney ? `(${serverMoney})` : null }</small>
            </div>
            <div className="d-flex">
                <span className="font-weight-bold mr-1">IDs:</span>
                { divWithCopyToClipboard(id, id) }
                <span className="font-weight-bold mr-1 ml-1">/</span>
                { divWithCopyToClipboard(appId, `${appId.slice(0, 6)}...`) }
            </div>
        </div>
    )

    return (
        <div className={order.error ? 'row text-danger' : 'row'}>
            <div className='col-md-3'>{ leftDiv }</div>
            <div className='col-md-3'>{ centerDiv }</div>
            <div className='col-md-6'>{ rightDiv }</div>
        </div>
    )
}

export default RenderOrderItem;
