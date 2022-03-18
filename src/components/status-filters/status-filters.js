import React, { Component } from 'react';

import './status-filters.css';

export default class StatusFilters extends Component {

    state = {
        errorButton: false,
        lowWaterButton: false,
        noConnectionButton: false,
        avtomatNumber: '',
        street: '',
        city: '',
        carNumber: '',
        withCarCheckBox: true
    }

    onFieldChange = (event, field) => {
        this.setState({[field]: event.target.value})
        this.props.onFieldChange(field, event.target.value)
    }

    onButtonClick = (buttonName) => {
        this.setState((state, props) => {
            this.props.onButtonClick(buttonName, !state[buttonName])
            return { [buttonName]: !state[buttonName] }
        })
    }

    render() {

        const { avtomatNumber, street, city, carNumber } = this.state;
        const { errorButton, lowWaterButton, noConnectionButton } = this.state;
        const { withCarCheckBox } = this.state;
        const { carNumbers } = this.props;

        const buttonClassName = "btn btn-outline-secondary";
        const activeButtonClassName = buttonClassName + ' active';
        const errorButtonClassName = errorButton ? activeButtonClassName : buttonClassName;
        const lowWaterButtonClassName = lowWaterButton ? activeButtonClassName : buttonClassName;
        const noConnectionButtonClassName = noConnectionButton ? activeButtonClassName : buttonClassName;

        return (
            <div className="form-row mb-2 ml-2 mr-2">
                <div className='col btn-group status-errors-button'>
                    <button type='button'
                            className={errorButtonClassName}
                            onClick={() => this.onButtonClick('errorButton')}
                            data-toggle="tooltip" title="With Errors"
                    >
                        <i className="fas fa-exclamation-triangle"></i>
                    </button>
                    <button type='button'
                            className={lowWaterButtonClassName}
                            onClick={() => this.onButtonClick('lowWaterButton')}
                            data-toggle="tooltip" title="Low Water Balance"
                    >
                        <i className="fas fa-tint-slash"></i>
                    </button>
                    <button type='button'
                        className={noConnectionButtonClassName}
                        onClick={() => this.onButtonClick('noConnectionButton')}
                        data-toggle="tooltip" title="No Data from Avtomat"
                    >
                        <i className="fas fa-bell-slash"></i>
                    </button>
                </div>
                <div className='col'>
                    <input type="text" className="form-control" placeholder="Avtomat Number"
                           value={avtomatNumber}
                           onChange={(event) => this.onFieldChange(event, 'avtomatNumber')}
                    />
                </div>
                <div className='col'>
                    <input type="text" className="form-control" placeholder="Street"
                           value={street}
                           onChange={(event) => this.onFieldChange(event, 'street')}
                    />
                </div>
                <div className="col">
                    <input type="text" className="form-control" placeholder="City"
                        value={city}
                        onChange={(event) => this.onFieldChange(event, 'city')}
                    />
                </div>
                <div className='col input-group'>
                    <select className="custom-select"
                            value={carNumber}
                            onChange={(event) => this.onFieldChange(event, 'carNumber')}
                    >
                        <option value="">All Cars</option>
                        { carNumbers.map((carNumber) => {
                            return <option key={carNumber} value={carNumber}>{carNumber}</option>
                        }) }
                    </select>
                    <div className="input-group-append">
                        <div className='input-group-text'>
                            <input type="checkbox"
                                checked={withCarCheckBox}
                                onChange={() => this.onButtonClick('withCarCheckBox')}
                            />&nbsp;
                            <label className="form-check-label">With Car</label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
