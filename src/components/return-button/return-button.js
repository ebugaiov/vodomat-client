import React, { useState } from 'react';

const ReturnButton = ({ id, money }) => {

    const [showReturnModal, setShowReturnModal] = useState(false)
    const [showAfterReturnModal, setShowAfterReturnModal] = useState(false)

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
            setShowAfterReturnModal(true)
        } else {
            return
        }
    }

    const returnModal = () => {
        return (
            <div className="modal" style={{display: 'block'}}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Return Order {id}</h5>
                        </div>
                        <div className='modal-body'>
                            <p className='text-dark'>Money: {money}</p>
                        </div>
                        <div className="modal-footer d-flex justify-content-between">
                            <button type="button" className="btn btn-danger" onClick={() => returnOrder(id)}>
                                Return
                            </button>
                            <button type="button" className="btn btn-secondary"
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
                            <h5 className="modal-title">Order {id} was returned</h5>
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
            <button type='button' className="badge badge-danger" onClick={() => setShowReturnModal(true)}>
                Return Order !
            </button>
            { showReturnModal ? returnModal() : null }
            { showAfterReturnModal ? afterReturnModal() : null}
        </React.Fragment>
    )

}

export default ReturnButton;