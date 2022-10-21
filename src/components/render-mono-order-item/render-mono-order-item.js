import React from 'react';

import './render-mono-order-item.css';

const RenderMonoOrderItem = (order) => {

    const { id, paymentGatewayId, serverId } = order;
    const { avtomatNumber, address, appStatus, createdAt, appMoney } = order;
    const { serverTime, serverStatus, serverMoney } = order;

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
            <span className="mr-3 text-info">{ avtomatNumber }</span>
            <span>{ address.split(' ').slice(2).join(' ') }</span>
        </div>
    )

    const centerDiv = (
        <div>
            {statusAppSpan}&nbsp;
            {statusServerSpan}
        </div>
    )

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
    }

    const rightDiv = (
        <div className='d-flex justify-content-between'>
            <div>
                <span><i className="fas fa-hourglass"></i>&nbsp;{ createdAt.split('T')[1].slice(0, 8) }</span>&nbsp;
                <small className='mr-3'>{ serverTime ? `(${ serverTime.split('T')[1].slice(0, 8) })` : null }</small>
            </div>

            <div>
                <span><i className="fas fa-coins"></i>&nbsp;{appMoney}</span>&nbsp;
                <small className='mr-3'>{ serverMoney ? `(${serverMoney})` : null }</small>
            </div>

            <div>
                <span className='font-weight-bold'>AppID:</span>&nbsp;
                <span
                    onMouseDown={(e) => {
                        e.target.className = 'pressedAppIdSpan';
                        copyToClipboard(id);
                    }}
                    onMouseUp={(e) => {
                        setTimeout(() => e.target.className = 'appIdSpan', 500)
                    }}
                    className='appIdSpan'
                >
                    { `${id.slice(0, 5)}...` }
                </span>
            </div>
            <div>
                <span className='font-weight-bold'>ServerID:</span>&nbsp;{ serverId }
            </div>
            <div>
                <span className='font-weight-bold'>PayGateID:</span>&nbsp;{ paymentGatewayId }
            </div>
        </div>
    )

    return (
        <div className={order.error ? 'row text-danger' : 'row'}>
            <div className='col-md-3'>{ leftDiv }</div>
            <div className='col-md-2'>{ centerDiv }</div>
            <div className='col-md-7'>{ rightDiv }</div>
        </div>
    )
}

export default RenderMonoOrderItem;
