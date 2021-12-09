import React, { useState } from 'react';

import VodomatService from '../../services/vodomat-service';

const AvtomatDelete = ({ avtomatNumber }) => {

    const vodomatService = new VodomatService()

    const [ showDeleteModal, setShowDeleteModal ] = useState(false);
    const [ showAfterDeleteModal, setShowAfterDeleteModal ] = useState(false);
    const [ deletedAvtomatNumber, setDeletedAvtomatNumber ] = useState(null);

    const deleteAvtomat = (number) => {
        vodomatService
            .deleteAvtomat(number)
            .then((resp) => {
                setDeletedAvtomatNumber(resp.avtomat_number)
                setShowDeleteModal(false)
                setShowAfterDeleteModal(true)
            })
    }

    const deleteModal = () => {
        return (
            <div className="modal" style={{display: 'block'}}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Delete Avtomat {avtomatNumber}</h5>
                        </div>
                        <div className="modal-footer d-flex justify-content-between">
                            <button type="button" className="btn btn-danger" onClick={() => deleteAvtomat(avtomatNumber)}>
                                Delete
                            </button>
                            <button type="button" className="btn btn-secondary"
                                    onClick={() => setShowDeleteModal(false)}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const afterDeleteModal = () => {
        return (
            <div className="modal" style={{display: 'block'}}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Avtomat {deletedAvtomatNumber} was deleted</h5>
                        </div>
                        <div className="modal-footer d-flex justify-content-between">
                            <button type="button" className="btn btn-secondary"
                                    onClick={() => {
                                        setShowAfterDeleteModal(false)
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
            <button type="button" className="btn btn-outline-danger" onClick={() => setShowDeleteModal(true)}>
                Delete
            </button>
            { showDeleteModal ? deleteModal() : null }
            { showAfterDeleteModal ? afterDeleteModal() : null }
        </React.Fragment>
    )
}

export default AvtomatDelete;