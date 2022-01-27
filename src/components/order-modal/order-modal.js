import React, { useState, useEffect } from "react";
import { Modal, Button } from 'react-bootstrap';

import PayService from "../../services/pay-service";
import Spinner from '../spinner';

const OrderModal = ({ id, closeOrderModal }) => {

    const payService = new PayService();
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);

    const handleClose = () => {
        closeOrderModal()
    }

    useEffect(() => {
        let cancelled = false;
        payService.getOrder(id)
            .then(res => {
                !cancelled && setOrder(res);
                setLoading(false);
            });
        return () => cancelled = true;
    }, [id])

    const { appStatus, payGateStatus, serverStatus, gateType } = order;

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

    return (
        <Modal show={true}>
            <Modal.Header>
                <Modal.Title>
                    { loading ? <Spinner /> : <span className="text-primary">{order.avtomatNumber}</span> }
                    <br/>
                    {order.address}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between">
                        {statusAppSpan}
                        {statusPayGateSpan}
                        {statusServerSpan}
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        PayGate ID
                        <span>{order.id}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        App ID
                        <small>{order.appId}</small>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        Server ID
                        <span>{order.serverId}</span>
                    </li>
                    
                    <li className="list-group-item d-flex justify-content-between">
                        Created At
                        <span>{order.createdAt}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span>Pay Gate <i className="far fa-clock"></i>&nbsp;{order.payGateTime ? order.payGateTime.split(' ')[1] : ''}</span>
                        <span>Server <i className="far fa-clock"></i>&nbsp;{order.serverTime ? order.serverTime.split('T')[1]: ''}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span>Pay Gate <i className="fas fa-hryvnia"></i>&nbsp;{order.payGateMoney}</span>
                        <span>Server <i className="fas fa-hryvnia"></i>&nbsp;{order.serverMoney}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span>Price: {order.price ? order.price / 100 : ''}</span>
                        <span>Transcaction: {order.transaction}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span>Card: {order.cardMask}</span>
                        {order.gateType}
                    </li>
                </ul>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default OrderModal;