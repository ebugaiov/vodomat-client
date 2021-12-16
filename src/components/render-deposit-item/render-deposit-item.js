import React from 'react';

const RenderDepositItem = (item) => {

    const { avtomatNumber, city, street, house, statusServer } = item;
    const { purchaseId, timePaymentGateway, billAmount, statusPaymentGateway } = item;
    let statusPaymentGatewayClass = 'pr-3';

    switch (statusPaymentGateway) {
        case 'PAYED':
            statusPaymentGatewayClass += ' text-success';
            break;
        case 'REJECTED':
            statusPaymentGatewayClass += ' text-warning';
            break;
        case 'RETURN':
            statusPaymentGatewayClass += ' text-danger';
            break;
        case 'CREATED':
            statusPaymentGatewayClass += ' text-dark';
            break;
        default:
            statusPaymentGatewayClass += '';
    }

    let statusServerElement = <span>{statusServer}</span>;
    switch (statusServer) {
        case 0:
            statusServerElement = <span className="text-warning">WAIT</span>;
            break;
        case 1:
            statusServerElement = <span className="text-success">DONE</span>;
            break;
        case 2:
            statusServerElement = <span className="text-danger">FAIL</span>;
            break;
        default:
            break;
    }

    const avtomatDiv = city ? 
        (
            <div>
                <span className="pr-4">{avtomatNumber}</span>
                <span className="pr-4">{`${street} ${house} `}</span>
                { statusServerElement }
            </div>
        ) : <i className="fas fa-ban text-danger"></i>

    const attentionDiv = !avtomatNumber && statusPaymentGateway === 'PAYED' ?
        (
            <div className="text-danger">
                <i className="fas fa-exclamation"></i>&nbsp;
                <i className="fas fa-exclamation"></i>&nbsp;
                <i className="fas fa-exclamation"></i>&nbsp;
            </div>
        ) : <div></div>

    const paymentGatewayDiv = purchaseId ?
        (
            <div className="row">
                <span className="pr-4">{timePaymentGateway.split(' ')[1]}</span>
                <span className="pr-4"><i className="fas fa-coins"></i>&nbsp;{billAmount}</span>
                <span className={statusPaymentGatewayClass}>{statusPaymentGateway}</span>
            </div>
        ) : <div></div>

    return (
        <div className="d-flex justify-content-between"
             title={`Purchase Id: ${purchaseId}`}>
                { avtomatDiv }
                { attentionDiv }
                { paymentGatewayDiv }
        </div>
    )
}

export default RenderDepositItem;