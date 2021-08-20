import React, { Component } from 'react';

import './deposit-filters.css';

export default class DepositFilters extends Component {

    state = {
        dateTerm: new Date().toISOString().substring(0, 10),
        avtomatNumberTerm: null,
        streetTerm: '',
        purchaseIdTerm: '',
        errorsButton: false,
        returnButton: false,
    }

    inputDateMinMax = () => {
        const today = new Date();
        const max = today.toISOString().slice(0, 10);
        today.setMonth(today.getMonth() - 3);
        const min = today.toISOString().slice(0, 10);
        return [min, max];
    }

    onDateTermChange = (event) => {
        this.setState({
            dateTerm: event.target.value
        })
        this.props.onDateChange(event.target.value)
    }

    onAvtomatNumberTermChange = (event) => {
        this.setState({
            avtomatNumberTerm: event.target.value
        })
        this.props.onAvtomatNumberChange(event.target.value)
    }

    onStreetTermChange = (event) => {
        this.setState({
            streetTerm: event.target.value
        })
        this.props.onStreetChange(event.target.value)
    }

    onPurchaseIdTermChange = (event) => {
        this.setState({
            purchaseIdTerm: event.target.value
        })
        this.props.onPurchaseIdChange(event.target.value)
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

    render() {

        const { errorsButton, returnButton } = this.state;

        const buttonClassName = "btn btn-outline-secondary";
        const activeButtonClassName = buttonClassName + ' active';
        const errorsButtonClassName = errorsButton ? activeButtonClassName : buttonClassName;
        const returnButtonClassName = returnButton ? activeButtonClassName : buttonClassName;

        return (
            <div className="card deposit-filters mb-3">
                <div className="card-header">Filter Deposits</div>
                <div className="card-body">

                    <div className="mb-3">
                        <input type="date" className="form-control"
                               value={this.state.dateTerm}
                               min={this.inputDateMinMax()[0]}
                               max={this.inputDateMinMax()[1]}
                               onChange={this.onDateTermChange}>
                        </input>
                    </div>

                    <div className="row mb-3">
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Input Number"
                                   value={this.state.numberTerm}
                                   onChange={this.onAvtomatNumberTermChange}>
                            </input>
                        </div>
                        <div className="col">
                            <input type="text" className="form-control" placeholder="Input Street"
                                   value={this.state.streetTerm}
                                   onChange={this.onStreetTermChange}>
                            </input>
                        </div>
                    </div>

                    <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Input Purchase Id"
                               value={this.state.purchaseIdTerm}
                               onChange={this.onPurchaseIdTermChange}>
                        </input>
                    </div>

                    <div className="btn-group d-flex">
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

                </div>
            </div>
        )
    }
}