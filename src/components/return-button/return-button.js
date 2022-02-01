import React, { useState } from 'react';

import Spinner from '../spinner';

const ReturnButton = ({ itemsToReturn }) => {

    const [showReturnModal, setShowReturnModal] = useState(false);
    const [showAfterReturnModal, setShowAfterReturnModal] = useState(false);
    const [loader, setLoader] = useState(false);
    const [success, setSuccess] = useState(false)

    const sumForReturn = Math.round(
                            (itemsToReturn.reduce((sum, item) => sum + item.appMoney, 0) + Number.EPSILON)
                            * 100)
                            / 100

    const returnOrder = async (id) => {
        const rawResponse = await fetch(`${process.env.REACT_APP_PAY_DOMAIN}/payment/portmone/return`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({payGateId: id})
        })
        const content = await rawResponse.json();
        if (content[id] === 'success') {
            return true;
        } else {
            return false;
        }
    }

    const returnAllOrders = async () => {
        setLoader(true)
        for (let i = 0; i < itemsToReturn.length; i++) {
            if (await returnOrder(itemsToReturn[i].id)) {
                continue
            } else {
                setLoader(false)
                setShowReturnModal(false)
                setShowAfterReturnModal(true)
                return;
            }
        }
        setLoader(false)
        setSuccess(true);
        setShowReturnModal(false);
        setShowAfterReturnModal(true);
    }

    const returnModal = () => {
        return (
            <div className="modal" style={{display: 'block'}}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header text-danger d-flex justify-content-between">
                            <h5 className="modal-title">Return Error Orders?</h5>
                            {loader ? <Spinner /> : null}
                        </div>
                        <div className="modal-footer d-flex justify-content-between">
                            <button type="button" className="btn btn-danger" disabled={loader}
                                    onClick={() => returnAllOrders()}>
                                Return
                            </button>
                            <button type="button" className="btn btn-secondary" disabled={loader}
                                    onClick={() => setShowReturnModal(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const afterReturnModal = () => {
        return (
            <div className="modal" style={{display: 'block'}}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            {
                                success ?
                                    <h5 className="modal-title text-success">All successfully returned</h5>
                                :
                                    <h5 className="modal-title text-danger">Something went wrong!</h5>
                            }
                        </div>
                        <div className="modal-footer d-flex justify-content-between">
                            <button type="button" className="btn btn-secondary"
                                    onClick={() => {
                                        setShowAfterReturnModal(false)
                                        window.location.reload()
                                    }}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <React.Fragment>
            <button type='button' className="badge badge-danger" disabled={sumForReturn > 0 ? false : true}
                    onClick={() => setShowReturnModal(true)}>
                Return&nbsp;{sumForReturn}
            </button>
            { showReturnModal ? returnModal() : null }
            { showAfterReturnModal ? afterReturnModal() : null}
        </React.Fragment>
    )

}

export default ReturnButton;