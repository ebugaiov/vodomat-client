import React, { Component } from 'react';

import './deposit-filters.css';

export default class DepositFilters extends Component {

    state = {
        date: new Date().toISOString().substring(0, 10),
        avtomatNumber: '',
        street: '',
        errorsButton: false,
        returnButton: false,
        purchaseId: ''
    }

    inputDateMinMax = () => {
        const today = new Date();
        const max = today.toISOString().slice(0, 10);
        today.setMonth(today.getMonth() - 3);
        const min = today.toISOString().slice(0, 10);
        return [min, max];
    }

    onFieldChange = (event, field) => {
        this.setState({[field]: event.target.value})
        this.props.onFieldChange(field, event.target.value)
    }

    onErrorsClick = () => {
        this.setState(({errorsButton}) => {
            this.props.onErrorsButtonClick(!errorsButton)
            return { errorsButton: !errorsButton }
        })
    }

    onReturnClick = () => {
        this.setState(({returnButton}) => {
            this.props.onReturnButtonClick(!returnButton)
            return { returnButton: !returnButton }
        })
    }

    onPurchaseIdChange = (event) => {
        this.setState({
            purchaseId: event.target.value
        })
    }

    onSubmitPurchaseIdForm = (event) => {
        event.preventDefault()
        const { purchaseId } = this.state;
        if (purchaseId.length > 35) {
            this.props.onDepositSelected(purchaseId)
            this.setState({purchaseId: ''})
        }
    }

    render() {

        const screenHeight = window.innerHeight;
        const screenWidth = window.innerWidth;
        if (screenHeight < 900 || screenWidth < 1200) {
            const inputElements = document.getElementsByClassName('form-control')
            const btnElements = document.getElementsByClassName('btn')
            for (let i = 0; i < inputElements.length; i++) {
                inputElements[i].classList.add('form-control-sm')
            }
            for (let j = 0; j < btnElements.length; j++) {
                btnElements[j].classList.add('btn-sm')
            }
        }

        const { errorsButton, returnButton } = this.state;

        const buttonClassName = "btn btn-outline-secondary";
        const activeButtonClassName = buttonClassName + ' active';
        const errorsButtonClassName = errorsButton ? activeButtonClassName : buttonClassName;
        const returnButtonClassName = returnButton ? activeButtonClassName : buttonClassName;

        return (
            <div className="deposit-filters card mb-3">
                <div className="card-header">Filter Deposits</div>
                <div className="card-body">

                    <div className="mb-3">
                        <input type="date" className="form-control"
                               value={this.state.date}
                               min={this.inputDateMinMax()[0]}
                               max={this.inputDateMinMax()[1]}
                               onChange={(event) => this.onFieldChange(event, 'date')}>
                        </input>
                    </div>

                    <div className="row mb-3">
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Input Number"
                                   value={this.state.avtomatNumber}
                                   onChange={(event) => this.onFieldChange(event, 'avtomatNumber')}>
                            </input>
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Input Street"
                                   value={this.state.street}
                                   onChange={(event) => this.onFieldChange(event, 'street')}>
                            </input>
                        </div>
                    </div>

                    <div className="btn-group d-flex mb-3">
                        <button type="button"
                                className={errorsButtonClassName}
                                onClick={this.onErrorsClick}>
                                    Errors
                        </button>
                        <button type="button"
                                className={returnButtonClassName}
                                onClick={this.onReturnClick}>
                                    Return
                        </button>
                    </div>

                    <form onSubmit={this.onSubmitPurchaseIdForm}>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Input Purchase Id"
                                value={this.state.purchaseId}
                                onChange={this.onPurchaseIdChange}
                            />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="submit">
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        )
    }
}